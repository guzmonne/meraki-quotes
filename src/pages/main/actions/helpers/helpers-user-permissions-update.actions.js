/**
 * HELPERS USER PERMISSIONS CREATE ACTIONS
 * Created by: Guzmán Monné
 *
 * Here you can find all the actions required to update the User Permissions values
 * stored inside a ConappsHelpers table, by the name UserPermissions. Loading, 
 * Success and Error actions are described here.
 */

import {
	DOING_HELPERS_USER_PERMISSIONS_UPDATE,
	HELPERS_USER_PERMISSIONS_UPDATE_SUCCESS,
	HELPERS_USER_PERMISSIONS_UPDATE_ERROR,
} from '../../../../state/action-types.js'

import AwsApiObservers from '../../../../modules/aws-api-observers.module.js'

/**
 * Calls the HelpersUserPermissionsUpdate Observable to save on the DB
 * the new UserPermission. It triggers all other actions involved as follows:
 * 1.  doingHelpersUserPermissionsCreate
 * 2a. helpersUserPermissionsCreateSuccess
 * 2b. helpersUserPermissionsCreateError
 * @return {Action} 
 */
export function doHelpersUserPermissionsUpdate(permission) {
	return (dispatch, getState) => {
		const oldUserPermissions = getState().helpers.userPermissions
		const newUserPermissions = oldUserPermissions.concat([permission])
		// Optimistically set the new permissions on the page
		dispatch(doingHelpersUserPermissionsUpdate(newUserPermissions))
		const observer = AwsApiObservers.
			helpersUserPermissionsUpdateObs(permission).
			share()
		observer.
			subscribe(
				()    => dispatch(helpersUserPermissionsUpdateSuccess()),
				error => dispatch(helpersUserPermissionsUpdateError(error, oldUserPermissions))
			)
		return observer
	}
}

export function doingHelpersUserPermissionsUpdate(permissions){
	return {
		type: DOING_HELPERS_USER_PERMISSIONS_UPDATE,
		permissions
	}
}

export function helpersUserPermissionsUpdateSuccess(){
	return {
		type: HELPERS_USER_PERMISSIONS_UPDATE_SUCCESS
	}
}

export function helpersUserPermissionsUpdateError(error, permissions){
	return {
		type: HELPERS_USER_PERMISSIONS_UPDATE_ERROR,
		error,
		permissions
	}
}