import {browserHistory} from 'react-router'
import {
	DOING_LOGIN_USER,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_ERROR
} from '../../../state/action-types.js'
import AwsApiObservers from '../../../modules/aws-api-observers.module.js'


export function doLoginUser(user){
	return (dispatch, getState) => {
		const handleSuccess = output => dispatch(loginUserSuccess(output))
		const handleError = error => dispatch(loginUserError(error))

		dispatch(doingLoginUser())

		AwsApiObservers.
			sessionLoginObs(user).
			subscribe(
				({response}) => {
					console.log(response)
					if(!response.login)
						return handleError('Error de autenticación.')
					localStorage.token = response.token

					browserHistory.push('/')
					handleSuccess()
				},
				error => handleError(error || 'Error de autenticación')
			)
	}
}

export function loginUserSuccess(output){
	return {
		type: LOGIN_USER_SUCCESS
	}
}

export function loginUserError(error){
	return {
		type: LOGIN_USER_ERROR,
		error
	}
}

export function doingLoginUser(){
	return {
		type: DOING_LOGIN_USER
	}
}