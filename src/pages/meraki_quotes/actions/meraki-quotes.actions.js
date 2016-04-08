import {
	TOGGLE_MERAKI_QUOTES_CREATE_MODAL,
	DOING_MERAKI_QUOTES_CREATE,
	MERAKI_QUOTES_CREATE_SUCCESS,
	MERAKI_QUOTES_CREATE_ERROR
} from '../../../state/action-types.js'
import AwsApiObservers from '../../../modules/aws-api-observers.module.js'

/**
 * Action to toggle the state of Meraki Create modal
 * @return {action} 
 */
export function toggleMerakiQuotesCreateModal(){
	return {
		type: TOGGLE_MERAKI_QUOTES_CREATE_MODAL
	}
}

export function doMerakiQuotesIndex(){

}

// MERAKI QUOTES CREATE

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