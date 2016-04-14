"use strict"

exports.handler = function(event, context, callback){
	console.log('Loading custom modules...')
	const Auth = require('./auth.module.js')

	if (!Auth){
		let msg = 'Auth module loding error'
		console.log(msg)
		callback(msg)
		return
	}

	console.log('Loading modules...')
	const Rx = require('rx')
	const _  = require('lodash')

	if (!Rx || !_){
		let msg = 'Rx module loding error'
		console.log(msg)
		callback(msg)
		return
	}

	console.log('Loading models...')
	const MerakiQuote = require('./merakiQuotes.model.js')
	
	if (!MerakiQuote){
		let msg = 'MerakiQuote module loding error'
		console.log(msg)
		callback(msg)
		ret
	}

	const getQuote = function(UserID, ID, fn){
		if (!_.isString(UserID) || !_.isString(ID) || !_.isFunction(fn)){
			let msg = 'Wrong getQuote() params'
			console.log(msg)
			callback(msg)
			return
		}
		MerakiQuote.
			query(UserID).
			filter('ID').equals(ID).
			exec(fn)
	}

	const ID = event.ID
	const Authorization = event.Authorization

	const invalidIDErrorMessage = 'ID invalida'

	console.log('Verifying ID')
	if (!ID || !Authorization)
		return callback(invalidIDErrorMessage)

	console.log('Getting current user id...')
	Auth.
		getUserIDFromAuthObs(Authorization).
		subscribe(
			onNext, onError
		)
	
	function onNext(UserID) {
		console.log('UserID = ' + UserID)
		getQuote(UserID, ID, (err, data) => {
			const getErrorMessage = 'Error al obtener el quote'
			if (err || data.Items.length === 0) {
				console.log(getErrroMessage)
				callback(getErrorMessage)
				return
			}
			console.log(JSON.stringify(data.Items))
			callback(null, data.Items[0].attrs)
		})
	}

	function onError(err){
		console.log(JSON.stringify(err))
		callback(err)
	}
}
