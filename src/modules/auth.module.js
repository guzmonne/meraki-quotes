'use strict'

/* IMPORTS */
import _ from 'lodash'
import moment from 'moment'

import Base64 from './base64.module.js'

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
		let localStorage

		if ('localStorage' in window)
			localStorage = window.localStorage
		else 
			return

		let token = localStorage.token
		// Check if token is defined
		if (!token || !_.isString(token))
			return undefined
		token = token.split('.')
		// Check if split token is an array
		if (!token.length === 3)
			throw new Error('Token was incorrectly formated')
		if (token[1] === undefined)
			throw new Error('Second element of token is undefined')
		token = JSON.parse(Base64.atob(token[1]))
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

	/**
	 * Gets the user from the stored token
	 * OBS: Not a best practise!
	 * @return {Object} User Object
	 */
	token.getUser = () => {
		const _token = token()
		console.log(_token)
		if (!_token) return undefined
		const user = _.pick(_token, 'username', 'permissions', 'email', 'ID')
		console.log(user)
		if (!user || Object.keys(user).length !== 4)
			throw new Error('Invalid user')
		return user
	}

	return Object.freeze({
		token
	})
}
const Auth = AuthModule()

/* EXPORTS */
export default Auth