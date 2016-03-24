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
		const lambda = new AWS.Lambda()
		const handleSuccess = user => dispatch(signupUserSuccess(user))
		const handleError = error => dispatch(signupUserError(error))

		dispatch(doingSignupUser());

		lambda.invoke({
			FunctionName: 'conapps-create-user',
			Payload: JSON.stringify(user)
		}, (err, data) => {
			if (err) return handleError(err);
			const output = JSON.parse(data.Payload)
			if (output.created) 
				handleSuccess(user)
			else
				handleError({type: 'email', message: 'Cuenta de correo existente.'})
		})
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