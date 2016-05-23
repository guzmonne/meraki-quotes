/**
 * HELPERS USER PERMISSIONS INDEX ACTIONS
 * Created by: Guzmán Monné
 *
 * Here you can find all the actions required to get the User Permissions values
 * stored inside a ConappsHelpers table, by the name UserPermissions. Loading, 
 * Success and Error actions are described here.
 */

import {
	DOING_HELPERS_USER_PERMISSIONS_INDEX,
	HELPERS_USER_PERMISSIONS_INDEX_SUCCESS,
	HELPERS_USER_PERMISSIONS_INDEX_ERROR,
} from '../../../../state/action-types.js'

import AwsApiObservers from '../../../../modules/aws-api-observers.module.js'

/**
 * Calls the HelpersUserPermissionsIndex Observable to ask the DB for the
 * UserPermissions. It triggers all other actions involved as follows:
 * 1. doingHelpersUserPermissionsIndex
 * 2a. helpersUserPermissionsIndexSuccess
 * 2b. helpersUserPermissionsIndexError
 * This way all outcomes are handled.
 * @return {Action} 
 */
export function doHelpersUserPermissionsIndex() {
	return (dispatch, getState) => {
		dispatch(doingHelpersUserPermissionsIndex())
		AwsApiObservers.
			helpersUserPermissionsIndexObs().
			subscribe(
				({response}) => dispatch(helpersUserPermissionsIndexSuccess(response.values)),
				error        => dispatch(helpersUserPermissionsIndexError(error))
			)
	}
}
/**
 * Returns an actions that sets the isFetchingUserPermissions flag to true
 * @return {Action} 
 */
export function doingHelpersUserPermissionsIndex(){
	return {
		type: DOING_HELPERS_USER_PERMISSIONS_INDEX
	}
}
/**
 * Returns an action that sets the gotten values on the store, and resets the 
 * error and the isFetchingUserPermissions flag.
 * @param  {Array} values Values collection
 * @return {Action}        
 */
export function helpersUserPermissionsIndexSuccess(values){
	return {
		type: HELPERS_USER_PERMISSIONS_INDEX_SUCCESS,
		values
	}
}
/**
 * Returns an actions that sets the gotten error and resets the
 * isFetchingUserPermissions flag.
 * @param  {Error} error Error object
 * @return {Action}       
 */
export function helpersUserPermissionsIndexError(error){
	return {
		type: HELPERS_USER_PERMISSIONS_INDEX_ERROR,
		error
	}
}