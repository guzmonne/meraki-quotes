import {
	ajaxObs,
	url,
	GET,
	POST,
	PUT,
	DELETE
} from './aws-api-observers.core.js'
import Auth from '../auth.module.js'

export const userChangePasswordObs = (clearPassword, newPassword) =>
	ajaxObs({
		method: POST,
		url   : url + '/change-password',
		body  : JSON.stringify({
			email: Auth.token.getUser().email,
			clearPassword,
			newPassword
		})
	})