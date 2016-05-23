import {
	DOING_HELPERS_USER_PERMISSIONS_INDEX,
	HELPERS_USER_PERMISSIONS_INDEX_SUCCESS,
	HELPERS_USER_PERMISSIONS_INDEX_ERROR,
} from '../../../state/action-types.js'

const defaultState = {
	isFetchingUserPermissions: false,
	userPermissions: [],
	userPermissionsIndexError: undefined
}

export default (state=defaultState, action) => {
	switch (action.type){
		case DOING_HELPERS_USER_PERMISSIONS_INDEX:
			return Object.assign(
				{},
				state,
				{isFetchingUserPermissions: true}
			)
		case HELPERS_USER_PERMISSIONS_INDEX_SUCCESS:
			return Object.assign(
				{},
				state,
				{userPermissions: action.values},
				{userPermissionsIndexError: undefined}
			)
		case HELPERS_USER_PERMISSIONS_INDEX_ERROR:
			return Object.assign(
				{},
				state,
				{userPermissionsIndexError: action.error}
			)
		default:
			return defaultState
	}
}