'use strict'

console.log('Loading custom modules...')
const Auth = require('./auth.module.js')

console.log('Loading modules...')
const Rx = require('rx')
const _  = require('lodash')

console.log('Loading models...')
const MerakiQuote = require('./merakiQuotes.model.js')

const updateQuote = function(quote, UserID, fn) {
	console.log('Updating quote...')
	MerakiQuote
		.query(quote.ID)
		.usingIndex('ID-Index')
		.exec((err, response) => {
			// There should be only one element and it should be the
			// needed quote.
			if (err)
				return fn(err)
			if (!response || !response.Items || !_.isArray(response.Items) || response.Items.length === 0)
				return fn('Authorization failed')
			const _quote = response.Items[0].get() 
			if (_quote.UserID !== UserID)
				return fn('Not Authorized')
			MerakiQuote.update(Object.assign({}, _quote, quote), fn)
		})
}

exports.handler = function(event, context, callback){
	let quote = event.quote
	const Authorization = event.Authorization

	const invalidQuoteErrorMessage = 'Quote invalido.'
	const updateErrorMessage = 'Error al actualizar el quote. '

	console.log('Verifying quote...')
	if (!quote || !quote.Name || !quote.Description)
		return callback(invalidQuoteErrorMessage)

	console.log('Getting current user id...')
	Auth.
	  getUserIDFromAuthObs(Authorization).
		subscribe(
			UserID => {
				console.log('UserID   = ' + UserID)
				updateQuote(quote, UserID, (err, data) => {
					if (err) {
						console.log(updateErrorMessage + err)
						return callback(updateErrorMessage)
					}
					console.log('Success!')
					callback(null, data)
				})
			},
			error => callback(error)
		)
}