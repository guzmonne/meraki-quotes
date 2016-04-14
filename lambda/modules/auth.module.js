const _  = require('lodash')
const Rx = require('rx')

const Users = require('./user.model.js')

const getUserFromAuthObs = function(auth){
	return getUserIDFromAuthObs(auth).
		do(UserID => console.log(UserID)).
		flatMap(UserID => getUserObs(UserID))
}

const getUserIDFromAuthObs = function(auth) {
	if (!_.isString(auth)){
		return Rx.Observable.throw('Token must be a string')
	}

	return getBodyKeyFromAuth('sub', auth)
}

const getBodyKeyFromAuth = function(key, auth) {
	if (!_.isString(auth)){
		return Rx.Observable.throw('Token must be a string')
	}

	if (!key || !_.isString(key))
		return Rx.Observable.throw('Key must be a string')

	return Rx.Observable.
		just(auth).
		map(auth => auth.split(' ')).
		map(authArray => {
			if (authArray.length !== 2 || authArray[0] !== 'Bearer')
				throw new Error('Invalid Authorization. No Bearer')

			return authArray[1].split('.')
		}).
		map(tokenArray => {
			if (tokenArray.length !== 3)
				throw new Error('Invalid Authorization. Wrong token array.')

			return JSON.parse(new Buffer(tokenArray[1], 'base64').toString('ascii'))
		}).
		map(body => {
			if (!body.jti)
				throw new Error('Invalid Authorization. No jti value on jwt token body.')

			if (!body[key])
				throw new Error(`Invalid Authorization. No ${key} value on jwt token body`)

			return body[key]
		})
}

const getUserObs = (UserID) => Rx.Observable.create(function(observer){
	return Users.
		query(UserID).
		usingIndex('ID-index').
		exec((err, data) => {
			if (err) return observer.onError(err)
			observer.onNext(data)
			observer.onCompleted()
		})
})

module.exports = {
	getUserFromAuthObs: getUserFromAuthObs,
	getUserIDFromAuthObs: getUserIDFromAuthObs
}