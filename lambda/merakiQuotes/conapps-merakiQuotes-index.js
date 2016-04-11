'use strict'

console.log('Loading custom modules...')
const Auth = require('./auth.module.js')

console.log('Loading modules...')
const Rx = require('rx')
const _  = require('lodash')

console.log('Loading models...')
const MerakiQuote = require('./merakiQuotes.model.js')

const queryQuotes = function(UserID, PageSize, startKey, fn) {
	if (!UserID){
		const msg = 'UserID not provided'
		console.log(msg)
		fn(msg, null)
		return
	}

	let query = MerakiQuote.
		query(UserID).
		descending().
		limit(PageSize || 2).
		attributes(['Name', 'Description', 'ID'])

	if (!!startKey && !!startKey.createdAt && !!startKey.UserID)
		query = query.startKey(startKey)

	query.exec(fn)
}

exports.handler = function(event, context, callback){
	const startKey = event.startKey
	const Authorization = event.Authorization
	const PageSize = event.PageSize
	const LastEvaluatedKey = {
		createdAt: event.createdAt,
	}

	const invaliAuthTokenErrorMessage = 'Invalid Authorization token.'
	const scanErrorMessage            = 'Error al consultar la base de datos.'

	console.log('Checking Authorization...')
	if (!_.isString(Authorization)){
		console.log(invaliAuthTokenErrorMessage)
		callback(invaliAuthTokenErrorMessage)
	}

	console.log('Getting quotes...')
	Auth.
		getUserIDFromAuthObs(Authorization).
		subscribe(
			UserID => {
				console.log('UserID = ' + UserID)
				if (!!LastEvaluatedKey){
					console.log('Formatting LastEvaluatedKey')
					LastEvaluatedKey.UserID = UserID
				}
				queryQuotes(UserID, PageSize, LastEvaluatedKey, (err, data) => {
					if (err) {
						console.log(scanErrorMessage + err)
						return callback(scanErrorMessage)
					}
					console.log('Success!')
					callback(null, data)
				})
			},
			error => callback(error)
		)
}