import {
	DOING_USERS_INDEX,
	USERS_INDEX_SUCCESS,
	USERS_INDEX_ERROR,
	DOING_USER_PERMISSIONS_INDEX,
	USER_PERMISSIONS_INDEX_SUCCESS,
	USER_PERMISSIONS_INDEX_ERROR,
	DOING_USER_PERMISSIONS_UPDATE,
	USER_PERMISSIONS_UPDATE_SUCCESS,
	USER_PERMISSIONS_UPDATE_ERROR,
	DOING_USER_SHOW,
	USER_SHOW_SUCCESS,
	USER_SHOW_ERROR,
	USER_CURRENT_FUNCTION_EDITABLE_TOGGLE,
	USER_CURRENT_FREE
} from '../../../state/action-types.js'

const breadcrumbs = [{
	tag: 'Home',
	action: '/'
}, {
	tag: 'Usuario'
}]

const defaultState = {
	collection: [],
	current: {},
	account: {},
	active: {},
	total: null,
	isFetchingUsers: false,
	isFetchingUser: false,
	error: {},
	permissions: [],
	areCurrentFunctionsEditable: false,
	breadcrumbs
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
		case DOING_USER_PERMISSIONS_INDEX:
			return Object.assign(
				{},
				state,
				{error: false},
				{isFetchingUserPermissions: true}
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
		case USER_PERMISSIONS_INDEX_SUCCESS:
			return Object.assign(
				{},
				state,
				{permissions: action.permissions},
				{error: false},
				{isFetchingUserPermissions: false}
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
		case USER_PERMISSIONS_INDEX_ERROR:
			return Object.assign(
				{},
				state,
				{error: action.error},
				{isFetchingUserPermissions: false}
			)
		case USER_CURRENT_FREE: 
			return Object.assign(
				{},
				state,
				{current: {}},
				{areCurrentFunctionsEditable: false}
			)
		case USER_CURRENT_FUNCTION_EDITABLE_TOGGLE:
			return Object.assign(
				{},
				state,
				{areCurrentFunctionsEditable: !state.areCurrentFunctionsEditable}
			)
		case DOING_USER_PERMISSIONS_UPDATE:
			return Object.assign(
				{},
				state,
				{current: Object.assign({}, state.current, {permissions: action.permissions})},
				{error: null}
			)
		case USER_PERMISSIONS_UPDATE_ERROR:
			return Object.assign(
				{},
				state,
				{current: Object.assign({}, state.current, {permissions: action.permissions})},
				{error: action.error}
			)
		case USER_PERMISSIONS_UPDATE_SUCCESS:
		default:
			return state
	}
}