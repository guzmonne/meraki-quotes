import {awsConfig} from '../../../modules/aws.module.js'
import {browserHistory} from 'react-router'
import {
	DOING_LOGIN_USER,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_ERROR
} from '../../../state/action-types.js'

export function doLoginUser(user){
	return (dispatch, getState) => {
		const lambda = new AWS.Lambda()
		const handleSuccess = output => dispatch(loginUserSuccess(output))
		const handleError = error => dispatch(loginUserError(error))

		dispatch(doingLoginUser())

		lambda.invoke({
			FunctionName: 'conapps-login-user',
			Payload: JSON.stringify(user)
		}, (err, data) => {
			if (err) return handleError(JSON.stringify(err))
			
			const output = JSON.parse(data.Payload)
			if (!output.login) return handleError('Error de autenticación.')
			localStorage.token = JSON.stringify(output)
			
			awsConfig(output)
			browserHistory.push('/')
			handleSuccess()				
		})
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