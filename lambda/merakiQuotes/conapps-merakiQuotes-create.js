console.log('Loading custom modules...')
const Auth = require('./auth.module.js')

console.log('Loading modules...')
const Rx = require('rx')

console.log('Loading models...')
const MerakiQuote = require('./merakiQuotes.model.js')

const createQuote = function(quote, fn) {
	console.log('Creating quote...')
	MerakiQuote.create(quote, fn)
}

exports.handler = function(event, context, callback){
	const quote = event.quote
	const Authorization = event.Authorization

	console.log(JSON.stringify(event))
	console.log(JSON.stringify(context))

	const invalidQuoteErrorMessage = 'Quote invalido.'
	const createErrorMessage = 'Error al crear el nuevo quote'

	console.log('Verifying quote...')
	if (!quote || !quote.Name || !quote.Description)
		return callback(invalidQuoteErrorMessage)

	console.log('Getting current user id...')
	Auth.
		getUserIDFromAuthObs(Authorization).
		subscribe(
			UserID => {
				console.log('UserID = ' + UserID)
				quote.UserID = UserID
				createQuote(quote, (err, data) => {
					if (err) {
						console.log(createErrorMessage + err)
						return callback(createErrorMessage)
					}
					console.log('Success!')
					callback(null, data)
				})
			},
			error => callback(error)
		)
}