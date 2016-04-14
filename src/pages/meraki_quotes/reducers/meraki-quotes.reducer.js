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
	MERAKI_QUOTES_GET_ERROR
} from '../../../state/action-types.js'

const defaultState = {
	collection                      : [],
	isGettingMerakiQuotes           : false,
	error                           : null,
	isShowingMerakiQuotesCreateModal: false,
	isCreatingMerakiQuote           : false,
	pagination                      : [null],
	page                            : 0,
	total                           : 0,
	pageSize                        : 10,
	queryString                     : "",
	count                           : 0,
	current                         : {}
}

export default function merakiQuotesReducer(state=defaultState, action){
	switch(action.type){
		// -----------------------------
		// MERAKI CREATE ACTION REDUCERS
		// -----------------------------
		case TOGGLE_MERAKI_QUOTES_CREATE_MODAL:
			return Object.assign(
				{},
				state,
				{isShowingMerakiQuotesCreateModal: !state.isShowingMerakiQuotesCreateModal} 
			)
		case DOING_MERAKI_QUOTES_CREATE:
			return Object.assign(
				{},
				state,
				{error: null},
				{isCreatingMerakiQuote: true},
				{isShowingMerakiQuotesCreateModal: false}
			)
		case MERAKI_QUOTES_CREATE_SUCCESS:
			return Object.assign(
				{},
				state,
				{error: null},
				{isCreatingMerakiQuote: false},
				{collection: [action.quote, ...state.collection]}
			)
		case MERAKI_QUOTES_CREATE_ERROR:
			return Object.assign(
				{},
				state,
				{error: action.error},
				{isCreatingMerakiQuote: false}
			)
		// -----------------------------
		// MERAKI INDEX ACTION REDUCERS
		// -----------------------------
		case DOING_MERAKI_QUOTES_INDEX:
			return Object.assign(
				{},
				state,
				{error: null},
				{isGettingMerakiQuotes: true}
			)
		case MERAKI_QUOTES_INDEX_SUCCESS:
			return Object.assign(
				{},
				state,
				{error: null},
				{isGettingMerakiQuotes: false},
				{collection: action.collection},
				{pagination: action.pagination},
				{page: action.page},
				{count: action.count}
			)
		case MERAKI_QUOTES_INDEX_ERROR:
			return Object.assign(
				{},
				state,
				{isGettingMerakiQuotes: false},
				{error: action.error}
			)
		case SET_MERAKI_QUOTES_PAGE_SIZE:
			return Object.assign(
				{},
				state,
				{pageSize: action.pageSize}
			)
		case SET_MERAKI_QUOTES_QUERY_STRING:
			return Object.assign(
				{},
				state,
				{queryString: action.queryString}
			)
		// ---------------------------
		// MERAKI GET ACTIONS REDUCERS
		// ---------------------------
		case DOING_MERAKI_QUOTES_GET:
			return Object.assign(
				{},
				state,
				{isGettingMerakiQuote: true}
			)
		case MERAKI_QUOTES_GET_SUCCESS:
			return Object.assign(
				{},
				state,
				{isGettingMerakiQuote: false},
				{current: action.quote},
				{error: null}
			)
		case MERAKI_QUOTES_GET_ERROR:
			return Object.assign(
				{},
				state,
				{isGettingMerakiQuote: false},
				{error: action.error}
			)	
		// -------
		// DEFAULT
		// -------
		default:
			return state
	}
}