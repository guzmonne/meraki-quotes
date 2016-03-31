import {
	DOING_USERS_INDEX,
	USERS_INDEX_SUCCESS,
	USERS_INDEX_ERROR
} from '../../../state/action-types.js'

const defaultState = {
	collection: [],
	total: null,
	isFetchingUsers: false,
	error: {}
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
		case USERS_INDEX_SUCCESS:
			return Object.assign(
				{},
				state,
				{isFetchingUsers: false},
				{error: false},
				{collection: action.response.Items},
				{total: action.response.Total}
			)
		case USERS_INDEX_ERROR:
			return Object.assign(
				{},
				state,
				{isFetchingUsers: false},
				{error: action.error}
			)
		default:
			return state
	}
}