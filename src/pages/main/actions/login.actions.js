import {awsConfig} from '../../../modules/aws.module.js'
import {browserHistory} from 'react-router'
import {
	DOING_LOGIN_USER,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_ERROR
} from '../../../state/action-types.js'

import Rx from 'rx-dom'

export function doLoginUser(user){
	return (dispatch, getState) => {
		const handleSuccess = output => dispatch(loginUserSuccess(output))
		const handleError = error => dispatch(loginUserError(error))

		dispatch(doingLoginUser())

		Rx.DOM.ajax({
			method: 'POST',
			url: 'https://8ewstzbc9l.execute-api.us-east-1.amazonaws.com/test/session/login',
			headers: {
				'Auth': 'allow'
			},
			body: JSON.stringify(user)
		}).
		subscribe(
			({response}) => {
				const output = JSON.parse(response)
				if(!output.login) return handleError('Error de autenticación.')
				localStorage.token = response

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