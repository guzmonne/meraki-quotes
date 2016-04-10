console.log('Loading custom modules...')
const Auth = require('./auth.module.js')

console.log('Loading modules...')
const Rx = require('rx')
const _  = require('lodash')

console.log('Loading models...')
const MerakiQuote = require('./merakiQuotes.model.js')

const scanQuotes = function(UserID, startKey, fn) {
	console.log('Creating quote...')
	let query = MerakiQuote.
		scan().
		where('UserID').equals(UserID).

	if (!_.isUndefined(startKey) && !_.isFunction(startKey))
		query = query.startKey(startKey)

	query.exec(fn)
}

exports.handler = function(event, context, callback){
	const startKey = event.startKey
	const Authorization = event.Authorization

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
				scanQuotes(UserID, startKey, (err, data) => {
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