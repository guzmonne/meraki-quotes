import {
	DOING_HELPERS_USER_PERMISSIONS_INDEX,
	HELPERS_USER_PERMISSIONS_INDEX_SUCCESS,
	HELPERS_USER_PERMISSIONS_INDEX_ERROR,
	DOING_HELPERS_USER_PERMISSIONS_UPDATE,
	HELPERS_USER_PERMISSIONS_UPDATE_SUCCESS,
	HELPERS_USER_PERMISSIONS_UPDATE_ERROR,
} from '../../../state/action-types.js'

const defaultState = {
	isFetchingUserPermissions : false,
	isUpdatingUserPermissions : false,
	userPermissions           : [],
	userPermissionsIndexError : undefined,
	userPermissionsUpdateError: undefined,
}

export default (state=defaultState, action) => {
	switch (action.type){
		case DOING_HELPERS_USER_PERMISSIONS_INDEX:
			return Object.assign(
				{},
				state,
				{isFetchingUserPermissions: true}
			)
		case DOING_HELPERS_USER_PERMISSIONS_UPDATE:
			return Object.assign(
				{},
				state,
				{isUpdatingUserPermissions: true},
				{userPermissions: action.permissions}
			)
		case HELPERS_USER_PERMISSIONS_INDEX_SUCCESS:
			return Object.assign(
				{},
				state,
				{isFetchingUserPermissions: false},
				{userPermissions: action.values},
				{userPermissionsIndexError: undefined}
			)
		case HELPERS_USER_PERMISSIONS_UPDATE_SUCCESS:
			return Object.assign(
				{},
				state,
				{isUpdatingUserPermissions: false},
				{userPermissionsUpdateError: undefined}
			)
		case HELPERS_USER_PERMISSIONS_INDEX_ERROR:
			return Object.assign(
				{},
				state,
				{isFetchingUserPermissions: false},
				{userPermissionsIndexError: action.error}
			)
		case HELPERS_USER_PERMISSIONS_UPDATE_ERROR:
			return Object.assign(
				{},
				state,
				{isUpdatingUserPermissions: false},
				{userPermissions: action.permissions},
				{userPermissionsUpdateError: action.error}
			)
		default:
			return state
	}
}