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

	const invalidQuoteErrorMessage = 'Quote invalido.'
	const createErrorMessage = 'Error al crear el nuevo quote'

	console.log('Verifying quote...')
	if (!quote || !quote.Name || !quote.Description)
		return callback(invalidQuoteErrorMessage)

	console.log('Getting current user id...')
	Auth.
		getUserFromAuthObs(Authorization).
		do(data => console.log(JSON.stringify(data))).
//  getUserIDFromAuthObs(Authorization).
		subscribe(
			data => {
				const User = data.Items[0]
				const UserID = User.get('ID')
				const UserName = User.get('username')
				console.log('UserID = ' + UserID)
				console.log('UserName = ' + UserName)
				quote.UserID = UserID
				quote.UserName = UserName
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