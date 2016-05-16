import {expect} from 'chai'
import _ from 'lodash'

import Base64 from '../../modules/base64.module.js'
import Auth from '../../modules/auth.module.js'

const token = {
	"sub":"73970639-a900-4c48-8f27-7027b44ad164",
	"iss":"http://conapps.click",
	"permissions": [
		"users-permissions-index",
		"user-permissions-update",
		"user-destroy",
		"user-create",
		"user-show",
		"users-index"
	],
	"jti":"376e9b8f-6f15-4864-bcc6-ff613f3cb03e",
	"iat":1463264820,
	"exp":1463268420
}

function resetLocalStorage(){
	window.localStorage = {}
}

function falseToken(_token){
	const _token_ = Object.assign({}, token, _token)
	return `${Base64.btoa("this")}.${Base64.btoa(JSON.stringify(_token_))}.${Base64.btoa("awesome")}`
}

describe('Auth Module', function(){

	const localStorage = {}
	
	beforeEach(resetLocalStorage)

	describe('#token()', function(){


		it('should return undefined if no token exists', function(){
			expect(Auth.token() === undefined).to.be.true
		})

		it('should throw an error if the stored token is not an object', function(){
			expect(Auth.token).to.throw
		})

		it('should throw an error if the stored token is wrongly formated', function(){
			expect(Auth.token).to.throw
		})

		it('should throw if the stored token is undefined', function(){
			localStorage.token = undefined
			window.localStorage = localStorage
			expect(Auth.token).to.throw
		})

		it('should return an object if the token stored is correctly formated', function(){
			localStorage.token = `${Base64.btoa("this")}.${Base64.btoa(JSON.stringify(token))}.${Base64.btoa("awesome")}`
			window.localStorage = localStorage
			const _token = Auth.token()
			expect(_token === undefined).to.be.false
			Object.keys(token).
				filter(key => key !== 'permissions').
				map(key => expect(token[key] === _token[key]).to.be.true)
		})

		describe('#hasExpired()', function(){

			it('should return undefined if token does not exist', function(){
				expect(Auth.token.hasExpired() === undefined).to.be.true
			})

			it('should return true if token has expiered', function(){
				localStorage.token = falseToken()
				window.localStorage = localStorage
				expect(Auth.token.hasExpired()).to.be.true
			})

			it('should return false if token has not expired', function(){
				const _token = {exp: Math.round(new Date().getTime() / 1000) }
				localStorage.token = falseToken(_token)
				window.localStorage = localStorage
				expect(Auth.token.hasExpired()).to.be.false
			})

		})
	
		describe('#getUser()', function(){

			it('should return undefined if no token is found', function(){
				expect(Auth.token.getUser()).to.be.undefined
			})

			it('should throw an error if the stored user is invalid', function(){
				localStorage.token = falseToken()
				window.localStorage = localStorage
				expect(Auth.token.getUser).to.throw
			})
			
			it('should return the user if a valid token is found', function(){
				const _token = {
					username   : 'Test User',
					email      : 'test@email.com',
					permissions: ['should', 'be', 'an', 'array'],
					ID         : '1A'
				}
				localStorage.token = falseToken( Object.assign({}, token, _token) )
				window.localStorage = localStorage
				const user = Auth.token.getUser()
				expect(_.isObject(user)).to.be.true
				const keys = Object.keys(user)
				expect(keys).to.have.length(4)
				keys.map(key => expect(user[key] === _token[key]))
				expect(_.isArray(user.permissions)).to.be.true
			})

		})

	})

})