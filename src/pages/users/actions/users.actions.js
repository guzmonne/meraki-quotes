import {
	DOING_USERS_INDEX,
	USERS_INDEX_SUCCESS,
	USERS_INDEX_ERROR,
	DOING_USER_SHOW,
	USER_SHOW_SUCCESS,
	USER_SHOW_ERROR
} from '../../../state/action-types.js'
import AwsApiObservers from '../../../modules/aws-api-observers.module.js'

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