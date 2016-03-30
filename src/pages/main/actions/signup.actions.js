import {browserHistory} from 'react-router'
import {
	DOING_SIGNUP_USER,
	SIGNUP_USER_SUCCESS,
	SIGNUP_USER_ERROR
} from '../../../state/action-types.js'
import AwsApiObservers from '../../../modules/aws-api-observers.module.js'

//setSignupFormError, doSignupUser

/**
 * Sets the signup error on the app state
 * @param {Object}
 * @return {action}
 */
export function signupFormSubmitError(error){
	return {
		type: SIGNUP_USER_ERROR,
		error
	}
}

export function doSignupUser(user){
	return (dispatch, getSTate) => {
		const handleSuccess = response => {
			if (!!response && !!response.created)
				browserHistory.push('/')
			if (!!response && !!response.errorMessage)
				return handleError(response.errorMessage)
			dispatch(signupUserSuccess(response))
		}
		const handleError = error => dispatch(signupUserError(error))

		dispatch(doingSignupUser());

		AwsApiObservers.
			userCreateObs(user).
			subscribe(
				({response}) => handleSuccess(response),
				error => handleError('Error con el servidor')
			)
	}
}

export function signupUserSuccess(user){
	return {
		type: SIGNUP_USER_SUCCESS,
		user
	}
}

export function signupUserError(error){
	return {
		type: SIGNUP_USER_ERROR,
		error
	}
}

export function doingSignupUser(){
	return {
		type: DOING_SIGNUP_USER
	}
}