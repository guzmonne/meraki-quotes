import {
	DOING_USER_CHANGE_PASSWORD,
	USER_CHANGE_PASSWORD_SUCCESS,
	USER_CHANGE_PASSWORD_ERROR
} from '../../../state/action-types.js'
import AwsApiObservers from '../../../modules/aws-api-observers.module.js'

export const doUserChangePassword = (currentPassword, newPassword) =>  {
	return (dispatch, getState) => {
		dispatch( doingUserChangePassword() )
		const observer = AwsApiObservers.
			userChangePasswordObs(currentPassword, newPassword).
			share()
		observer.subscribe(
			( ) => dispatch( userChangePasswordSuccess() ),
			(e) => dispatch( userChangePasswordError(e) )
		)
		return observer
	}
}

export const doingUserChangePassword = () => {
	return {
		type: DOING_USER_CHANGE_PASSWORD
	}
}

export const userChangePasswordSuccess = () => {
	return {
		type: USER_CHANGE_PASSWORD_SUCCESS
	}
}

export const userChangePasswordError = (error) => {
	return {
		type: USER_CHANGE_PASSWORD_ERROR,
		error
	}
}