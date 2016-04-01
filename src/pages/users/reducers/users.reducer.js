import {
	DOING_USERS_INDEX,
	USERS_INDEX_SUCCESS,
	USERS_INDEX_ERROR,
	DOING_USER_SHOW,
	USER_SHOW_SUCCESS,
	USER_SHOW_ERROR
} from '../../../state/action-types.js'

const defaultState = {
	collection: [],
	current: {},
	total: null,
	isFetchingUsers: false,
	error: {},
	functions: [],
	areCurrentFunctionsEditable: false,
}

export default function usersReducer(state=defaultState, action){
	switch(action.type){
		case DOING_USERS_INDEX:
			return Object.assign(
				{},
				state,
				{isFetchingUsers: true},
				{error: {}}
			)
		case DOING_USER_SHOW:
			return Object.assign(
				{},
				state,
				{isFetchingUser: true},
				{error: null}
			)
		case USERS_INDEX_SUCCESS:
			return Object.assign(
				{},
				state,
				{isFetchingUsers: false},
				{error: null},
				{collection: action.response.Items},
				{total: action.response.Total}
			)
		case USER_SHOW_SUCCESS:
			return Object.assign(
				{},
				state,
				{isFetchingUser: false},
				{error: null},
				{current: action.response.Item}
			)
		case USERS_INDEX_ERROR:
			return Object.assign(
				{},
				state,
				{isFetchingUsers: false},
				{error: action.error}
			)
		case USER_SHOW_ERROR:
			return Object.assign(
				{},
				state,
				{isFetchingUser: false},
				{error: action.error}
			)
		default:
			return state
	}
}