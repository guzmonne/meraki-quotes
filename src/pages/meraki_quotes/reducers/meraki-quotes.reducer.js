import {
	TOGGLE_MERAKI_QUOTES_CREATE_MODAL,
	DOING_MERAKI_QUOTES_CREATE,
	MERAKI_QUOTES_CREATE_SUCCESS,
	MERAKI_QUOTES_CREATE_ERROR
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
	count                           : 0
}

export default function merakiQuotesReducer(state=defaultState, action){
	switch(action.type){
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
		default:
			return state
	}
}