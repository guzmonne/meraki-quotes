'use strict'

/* IMPORTS */
import _ from 'lodash'
import moment from 'moment'

/* DEFAULTS */
const defaults = {
	tokenKeys: ["sub", "iss", "permissions", "jti", "iat", "exp"]
}

/* CONSTRUCTOR */
function AuthModule(){
	const {tokenKeys} = defaults

	/**
	 * Gets the body of the token
	 * @return {Object} Valid token body
	 */
	const token = () => {
		let token = localStorage.token
		// Check if token is defined
		if (!token || !_.isString(token))
			return undefined
		token = token.split('.')
		// Check if split token is an array
		if (!token.length === 3)
			return undefined
		token = JSON.parse(atob(token[1]))
		// Check if token body has the required keys
		if (!_.pick(token, tokenKeys).length === tokenKeys.length)
			return undefined
		return token
	}

	/**
	 * Checks to see wether the token has expired
	 * @return {Boolean} Status of the token expiration
	 */
	token.hasExpired = () => {
		const _token = token()
		if (!_token) return undefined
		// The token expires after an hour
		return moment(new Date()).isAfter(moment(_token.exp * 1000).add(1, 'hour'))
	}

	return Object.freeze({
		token
	})
}
const Auth = AuthModule()

/* EXPORTS */
export default Auth