import {
	TOGGLE_MERAKI_QUOTES_CREATE_MODAL,
	DOING_MERAKI_QUOTES_CREATE,
	MERAKI_QUOTES_CREATE_SUCCESS,
	MERAKI_QUOTES_CREATE_ERROR,
	DOING_MERAKI_QUOTES_INDEX,
	MERAKI_QUOTES_INDEX_SUCCESS,
	MERAKI_QUOTES_INDEX_ERROR,
	SET_MERAKI_QUOTES_PAGE_SIZE,
	SET_MERAKI_QUOTES_QUERY_STRING,
	DOING_MERAKI_QUOTES_GET,
	MERAKI_QUOTES_GET_SUCCESS,
	MERAKI_QUOTES_GET_ERROR,
	DOING_MERAKI_QUOTES_UPDATE,
	MERAKI_QUOTES_UPDATE_SUCCESS,
	MERAKI_QUOTES_UPDATE_ERROR
} from '../../../state/action-types.js'
import _ from 'lodash'
import AwsApiObservers from '../../../modules/aws-api-observers.module.js'


// MERAKI QUOTES CREATE

/**
 * Action to toggle the state of Meraki Create modal
 * @return {action} 
 */
export function toggleMerakiQuotesCreateModal(){
	return {
		type: TOGGLE_MERAKI_QUOTES_CREATE_MODAL
	}
}

/**
 * Async action that initiates an API call to create a new quote.
 * First it sets the 'isCreatingMerakiQuote' flag on the state.
 * Then it calls the API. If the call is successful, the quote is
 * added. Else, we handle the error management through 
 * handleMerakiQuotesError() method.
 * @param  {MerakiQuote} quote Valid Meraki Quote Object
 * @return {Dispatch Function}
 */
export function doMerakiQuotesCreate(quote){
	return dispatch => {
		const handleSuccess = (quote) =>
			dispatch(merakiQuotesCreateSuccess(quote))
		const handleError = (error) =>
			dispatch(handleMerakiQuotesError(MERAKI_QUOTES_CREATE_ERROR, error))

		dispatch(doingMerakiQuotesCreate())

		AwsApiObservers.
			merakiQuotesCreateObs(quote).
			do(x => console.log(x)).
			subscribe(
				({response}) => handleSuccess(response),
				error => handleError(error)
			)
	}
}

/**
 * Action to add the newly created quote to the Meraki Quotes
 * collection.
 * @param  {Meraki Quote} quote Valid Meraki Quote Object
 * @return {Action}       
 */
function merakiQuotesCreateSuccess(quote){
	return {
		type: MERAKI_QUOTES_CREATE_SUCCESS,
		quote
	}
}

/**
 * Action that turns on the 'isCreatingMerakiQuote' flag.
 * @return {Action} 
 */
function doingMerakiQuotesCreate(){
	return {
		type: DOING_MERAKI_QUOTES_CREATE
	}
}

////////////////////////////////

// MERAKI QUOTES INDEX

// Pagination Reasoning
// --------------------
// [null]
// Opciones: -1, 0, 1
// -1 -> null -> A -> [null, A]
//                     ^
//  0 -> null -> A -> [null, A]
//                     ^
//  1 -> A    -> B -> [null, A, B]
//                           ^
// -------------------------------                    
// [null, A, B]
// Opciones: -1, 0, 1
// -1 -> null -> A -> [null, A, B] ~ [null, A]
//                      ^              ^
//  0 -> A    -> B -> [null, A, B]
//                           ^
//  1 -> B    -> C -> [null, A, B, C]
//                              ^
// ----------------------------------
// [null, A, B] ~ [A, B, C]                                                                                     
//        ^           ^
/**
 * Action to get the list of quotes of the user. It sets the proper pagination
 * value depending on the asked page and the current pagination state.
 * @param  {Number} turnPage Page modifier, can be lower than zero to move back
 * @return {Action Thunk}          
 */
export function doMerakiQuotesIndex(turnPage=0){
	return (dispatch, getState) => {
		const {pageSize, pagination, page, queryString} = getState().merakiQuotes
		// Calculate the next page based on the input and the current page
		const nextPage = (page + turnPage) < 0 ? 0 : page + turnPage
		// Setting createdAt value to select the correct page
		const createdAt = pagination[nextPage];

		// Dispatch action to let the user know the fetch is running
		dispatch(doingMerakiQuotesIndex())

		AwsApiObservers.
			merakiQuotesIndexObs(pageSize, createdAt, queryString).
			subscribe(
				// onNext
				({response}) => {
					// Check to see if an error message was returned
					const {errorMessage} = response
					if (!!errorMessage){
						console.log(errorMessage)
						dispatch(handleMerakiQuotesError(MERAKI_QUOTES_INDEX_ERROR, {error: errorMessage}))
						return
					}

					const {Items, LastEvaluatedKey, Count} = response
					const createdAt = !!LastEvaluatedKey ? LastEvaluatedKey.createdAt : undefined
					let options = {collection: Items}
					if (turnPage === -1) {
						// The page can't be negative, else move the page back one step
						options.page = page - 1 < 0 ? 0 : page - 1
						// Make sure to filter undefined values from the pagination array.
						// If this is not done pagination breaks.
						options.pagination = pagination.length < 2 ? [null, createdAt].filter(x => !_.isUndefined(x) ) : pagination
						// Save the number of objects retuned. Not being used ATM
						options.count = Count
					}
					if (turnPage ===  0) {
						// Page doesn't change.
						options.page = page
						// Make sure to filter undefined values from the pagination array.
						// If this is not done pagination breaks.
						options.pagination = [...pagination.slice(0, pagination.length), createdAt].filter(x => !_.isUndefined(x))
						// Save the number of objects retuned. Not being used ATM
						options.count = Count
					}
					if (turnPage === 1){
						// Move the page forward by one step
						options.page = page + 1
						// Make sure to filter undefined values from the pagination array.
						// If this is not done pagination breaks.
						// Add the new createdAt value to pagination array.
						options.pagination = !!createdAt ? [...pagination, createdAt] : pagination
						options.count = Count
					}
					dispatch(merakiQuotesIndexSuccess(options))
				},
				// onError
				error => dispatch(handleMerakiQuotesError(MERAKI_QUOTES_INDEX_ERROR, error))
			)
	}
}

/**
 * Sets the current Meraki Quotes index size
 * @param {Number} pageSize New page size
 */
export function setMerakiQuotesPageSize(pageSize){
	return {
		type: SET_MERAKI_QUOTES_PAGE_SIZE,
		pageSize
	}
}

export function setMerakiQuotesQueryString(queryString){
	return {
		type: SET_MERAKI_QUOTES_QUERY_STRING,
		queryString
	}
}

/**
 * Action to toggle the 'isGettingMerakiQuotes' state value
 * @return {Action} 
 */
function doingMerakiQuotesIndex(){
	return {
		type: DOING_MERAKI_QUOTES_INDEX
	}
}

/**
 * Action to handle a successful quotes update
 * @param  {Object} options State update options object
 * @return {Action}         
 */
function merakiQuotesIndexSuccess(options){
	return Object.assign(
		{type: MERAKI_QUOTES_INDEX_SUCCESS},
		options
	)
}

////////////////////////////////

// MERAKI QUOTES GET

/**
 * Actions that gets a single quote from the DB
 * If the ID param is sent as an object it is considered an options
 * object. The only abailable option now is 'reset' to set the
 * current MerakiQuote to an empty object.
 * @param  {Object || String} ID Quote ID or options Object
 * @return {ActionDispatcher}    
 */
export function doMerakiQuotesGet(ID){
	if (_.isObject(ID)){
		const options = ID;
		if (!!options.reset)
			return merakiQuotesGetSuccess({})
	}

	return (dispatch, getState) => {
		dispatch(doingMerakiQuotesGet())

		AwsApiObservers.
			merakiQuotesGetObs(ID).
			subscribe(
				({response}) => {
					console.log(response)
					dispatch(merakiQuotesGetSuccess(response))
				},
				error => dispatch(handleMerakiQuotesError(MERAKI_QUOTES_GET_ERROR, error))
			)
	}
}

/**
 * Action to toggle the updatign value
 * @return {Action} 
 */
function doingMerakiQuotesGet(){
	return {
		type: DOING_MERAKI_QUOTES_GET
	}
}

/**
 * Action to set the gotten quote
 * @param  {MerakiQuote} quote Object representing a Meraki Quote
 * @return {Action}
 */
function merakiQuotesGetSuccess(quote){
	return {
		type: MERAKI_QUOTES_GET_SUCCESS,
		quote
	}
}

////////////////////////////////

// MERAKI QUOTES UPDATE

/**
 * Constant that stores the valid Meraki Quote Schema
 * @type {Array}
 */
const merakiQuoteUpdatableKeys = [
	'Name',
	'Description',
	'Devices',
	'Discount',
	'DealApproved',
	'SoftwareMargin',
	'HardwareMargin',
	'ServiceMargin',
	'AdminMargin',
	'ServiceLevel',
	'LicenceYears',
	'SharedWith'
]

/**
 * Action that updates the current Meraki Quote via a PATCH
 * request, carrying the updated keys on its body.
 * @param  {Object} patch A piece of a Meraki Quote to update the current one.
 * @return {Action Dispatcher}       
 */
export function doMerakiQuotesUpdate(patch){
	return dispatch => {
		// patch must be an object
		if (!_.isObject(patch)) return
		// Only allow certain keys
		patch = _.pick(patch, merakiQuoteUpdatableKeys)
		// Check wether the modified patch object is empty
		if (Object.keys(patch).length === 0) return

		dispatch(doingMerakiQuotesUpdate(patch))

		Rx.Observable.
			just({done: true}).
			delay(2000).
			subscribe(
				() => dispatch(merakiQuotesUpdateSuccess()),
				error => dispatch(handleMerakiQuotesError(MERAKI_QUOTES_UPDATE_ERROR, error))
			)
	}
}

function doingMerakiQuotesUpdate(patch){
	return {
		type: DOING_MERAKI_QUOTES_UPDATE,
		patch
	}
}

function merakiQuotesUpdateSuccess(){
	return {
		type: MERAKI_QUOTES_UPDATE_SUCCESS
	}
}

////////////////////////////////

// ERROR HANDLING

/**
 * Action to handle MerakiQuote errors. As for now, it just returns
 * a new action with the provided arguments.
 * @param  {Type}    type Valid Action Type
 * @param  {Arguments} args Any argument that must be passed with the action
 * @return {Action}         
 */
function handleMerakiQuotesError(type, ...args){
	return Object.assign({}, {type}, ...args)
}