import {expect} from 'chai'
import _ from 'lodash'

import usersReducer from '../../../../pages/users/reducers/users.reducer.js'
import * as types from '../../../../state/action-types.js'

import {falseStore} from '../../../state/false-store.js'

describe('Users Reducer', function(){

	describe('default', function(){
		const error = {}
		const store = usersReducer({	
			isUserChangingPassword: false,
			error
		}, {})

		it('should have the isUserChangingPassword flag set to false', function(){
			expect(store.isUserChangingPassword).to.be.false
		})

		it('should have an empty object as the error value', function(){
			expect(Object.keys(store.error)).to.have.length(0)
		})

	})

	describe('DOING_USER_CHANGE_PASSWORD', function(){
		const error = {msg: 'This is an error'}
		const store = usersReducer({
			isUserChangingPassword: false,
			error
		}, {
			type: types.DOING_USER_CHANGE_PASSWORD
		})

		it('should set the isUserChangingPassword flag to true', function(){
			expect(store.isUserChangingPassword).to.be.true
		})

		it('should have an empty object as the error value', function(){
			expect(Object.keys(store.error)).to.have.length(0)
		})

	})

	describe('USER_CHANGE_PASSWORD_SUCCESS', function(){
		const error = {msg: 'This is an error'}
		const store = usersReducer({
			isUserChangingPassword: true,
			error
		}, {
			type: types.USER_CHANGE_PASSWORD_SUCCESS
		})

		it('should set the isUserChangingPassword flag to false', function(){
			expect(store.isUserChangingPassword).to.be.false
		})

		it('should have an empty object as the error value', function(){
			expect(Object.keys(store.error)).to.have.length(0)
		})
	})

	describe('USER_CHANGE_PASSWORD_ERROR', function(){
		const error = {msg: 'This is an error'}
		const store = usersReducer({
			isUserChangingPassword: true,
			error: {}
		}, {
			type: types.USER_CHANGE_PASSWORD_ERROR,
			error
		})

		it('should set the isUserChangingPassword to false', function(){
			expect(store.isUserChangingPassword).to.be.false
		})

		it('should set the error value to the error value', function(){
			expect(store.error).to.equal(error)
		})
	})

})