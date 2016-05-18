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
	USER_CURRENT_FREE,
	USER_CURRENT_FUNCTION_EDITABLE_TOGGLE,
	GET_ACTIVE_USER,
	DOING_USER_VERIFICATION,
	USER_VERIFICATION_ERROR,
	USER_VERIFICATION_SUCCESS
} from '../../../state/action-types.js'
import AwsApiObservers from '../../../modules/aws-api-observers.module.js'
import Auth from '../../../modules/auth.module.js'

export function doUsersIndex() {
	return (dispatch, getState) => {
		const handleSuccess = response => dispatch(usersIndexSuccess(response))
		const handleError = response => dispatch(usersIndexError(response))

		dispatch(doingUsersIndex())

		AwsApiObservers.
			usersIndexObs().
			subscribe(
				({response}) => handleSuccess(response),
				error => handleError(error)
			)
	}
}

export function doUserShow(email){
	return (dispatch, getState) => {
		const handleSuccess = response => dispatch(userShowSuccess(response))
		const handleError = error => dispatch(userShowError(error))

		dispatch(doingUserShow())

		AwsApiObservers.
			userShowObs(email).
			subscribe(
				({response}) => handleSuccess(response),
				error => handleError(error)
			)
	}
}

export function doUserPermissionsIndex(){
	return dispatch => {
		const handleSuccess = permissions => 
			dispatch(userPermissionsIndexSuccess(permissions))
		const handleError = error =>
			dispatch(userPermissionsIndexError(error))

		dispatch(doingUserPermissionsIndex())

		AwsApiObservers.
			userPermissionsIndexObs().
			subscribe(
				({response}) => handleSuccess(response),
				error => handleError(error)
			)
	}
}

export function doUserPermissionsUpdate(permission){
	return (dispatch, getState) => {
		const handleSuccess = () =>
			dispatch(userPermissionsUpdateSuccess())
		const handleError = (error, permissions) =>
			dispatch(userPermissionsUpdateError(error, permissions))
		const users = getState().users
		const {email, permissions=[]} = users.current
		let newPermissions

		if (permissions.indexOf(permission) > -1)
			newPermissions = permissions.filter(x => x !== permission)
		else
			newPermissions = [permission, ...permissions]

		dispatch(doingUserPermissionsUpdate(newPermissions))

		AwsApiObservers.
			userPermissionsUpdateObs(email, newPermissions).
			subscribe(
				() => handleSuccess(),
				error => handleError('Se produjo un error al actualizar los permisos del usuario.', permissions)
			)
	}
}

export function doUserVerification(email, verificationToken){
	return (dispatch) => {
		dispatch(doingUserVerification())

		AwsApiObservers.
			userVerificationObs(email, verificationToken).
			subscribe(
				()    => dispatch(userVerificationSuccess()),
				error => dispatch(userVerificationError(error))
			)
	}
}

export function getActiveUser(){
	return {
		type: GET_ACTIVE_USER,
		user: Auth.token.getUser()
	}
}

export function doingUsersIndex() {
	return {
		type: DOING_USERS_INDEX
	}
}

export function doingUserShow(){
	return {
		type: DOING_USER_SHOW
	}
}

export function doingUserPermissionsIndex(){
	return {
		type: DOING_USER_PERMISSIONS_INDEX
	}
}

export function doingUserPermissionsUpdate(permissions){
	return {
		type: DOING_USER_PERMISSIONS_UPDATE,
		permissions
	}
}

export function usersIndexSuccess(response) {
	return {
		type: USERS_INDEX_SUCCESS,
		response
	}
}

export function userShowSuccess(response){
	return {
		type: USER_SHOW_SUCCESS,
		response
	}
}

export function userPermissionsIndexSuccess(permissions){
	return {
		type: USER_PERMISSIONS_INDEX_SUCCESS,
		permissions
	}
}

export function userPermissionsUpdateSuccess(){
	return {
		type: USER_PERMISSIONS_UPDATE_SUCCESS
	}
}

export function usersIndexError(error) {
	return {
		type: USERS_INDEX_ERROR,
		error
	}
}

export function userShowError(error){
	return {
		type: USER_SHOW_ERROR,
		error
	}
}

export function userPermissionsIndexError(error){
	return {
		type: USER_PERMISSIONS_INDEX_ERROR,
		error
	}
}

export function userPermissionsUpdateError(error, permissions){
	return {
		type: USER_PERMISSIONS_UPDATE_ERROR,
		error,
		permissions
	}
}

export function userCurrentFree(){
	return {
		type: USER_CURRENT_FREE
	}
}

export function userCurrentFunctionsEditableToggle(){
	return {
		type: USER_CURRENT_FUNCTION_EDITABLE_TOGGLE
	}
}

export function doingUserVerification(){
	return {
		type: DOING_USER_VERIFICATION
	}
}

export function userVerificationSuccess(){
	return {
		type: USER_VERIFICATION_SUCCESS
	}
}

export function userVerificationError(error){
	return {
		type: USER_VERIFICATION_ERROR,
		error
	}
}