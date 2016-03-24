import {
	DOING_SIGNUP_USER,
	SIGNUP_USER_SUCCESS,
	SIGNUP_USER_ERROR
} from '../../../state/action-types.js'

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
		const handleSuccess = () => dispatch(signupUserSuccess({1:2, 3:4}))
		const handleError = error => dispatch(signupUserError(error))

		dispatch(doingSignupUser());

		setTimeout(() => handleSuccess(), 3000)
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