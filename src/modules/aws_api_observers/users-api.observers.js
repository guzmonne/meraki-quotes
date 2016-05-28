import {
	ajaxObs,
	url,
	GET,
	POST,
	PUT,
	DELETE
} from './aws-api-observers.core.js'

export const userChangePasswordObs = (clearPassword, newPassword) =>
	ajaxObs({
		method: POST,
		url   : url + 'users/change-password',
		body  : JSON.stringify({clearPassword, newPassword})
	})