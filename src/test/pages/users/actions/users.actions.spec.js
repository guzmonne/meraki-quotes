import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {expect} from 'chai'

import Rx from 'rx'

import * as actions from '../../../../pages/users/actions/users.actions.js'
import * as types from '../../../../state/action-types.js'
import AwsApiObservers from '../../../../modules/aws-api-observers.module.js'

import * as Helpers from '../../../helpers/test.helpers.js'

const mockStore = configureMockStore([thunk])
const mock = {
	status: 200,
	response: {}
}
const defaultStore = (defaults) => Object.assign({}, {
	users: {
		account: {
			username   : 'Test User',
			email      : 'test@example.com',
			ID         : 'A1',
			permissions: ['one', 'two']
		},
		isChangingPassword: false,
		error: null
	}
}, defaults)

describe('Users Actions', function(){

	describe('#doUserChangePassword()', function(){

		const userChangePasswordObsBak = Helpers.clone(AwsApiObservers.userChangePasswordObs)

		before(function(){
			AwsApiObservers.userChangePasswordObs = () => Rx.Observable.just(mock)
		})

		after(function(){
			AwsApiObservers.userChangePasswordObs = userChangePasswordObsBak
		})

		it('should trigger the DOING_USER_CHANGE_PASSWORD action', function(done){
			const store = mockStore(defaultStore())
			store.dispatch(actions.doUserChangePassword('clearPassword', 'newPassword')).
				subscribe(
					() => {},
					() => {},
					() => {
						expect(store.getActions()[0].type).to.equal(
							types.DOING_USER_CHANGE_PASSWORD
						)
						done()
					}
				)
		})

		it('should trigger the USER_CHANGE_PASSWORD_SUCCESS action on success', function(done){
			const store = mockStore(defaultStore())
			store.dispatch(actions.doUserChangePassword('clearPassword', 'newPassword')).
				subscribe(
					() => {},
					() => {},
					() => {
						expect(store.getActions()[1].type).to.equal(
							types.USER_CHANGE_PASSWORD_SUCCESS
						)
						done()
					}
				)
		})

		it('should trigger the USER_CHANGE_PASSWORD_ERROR action on error', function(done){
			const error = 'error'
			AwsApiObservers.userChangePasswordObs = () => Rx.Observable.throw(error)
			const store = mockStore(defaultStore())
			store.dispatch(actions.doUserChangePassword('clearPassword', 'newPassword')).
				subscribe(
					() => {},
					(e) => {
						expect(store.getActions()[1].type).to.equal(
							types.USER_CHANGE_PASSWORD_ERROR
						)
						expect(e).to.equal(error)
						done()
					}
				)
		})

	})

	describe('#doingUserChangePassword()', function(){

		it('should return the correct action', function(){
			const store  = mockStore(defaultStore())
			const action = store.dispatch(actions.doingUserChangePassword())
			expect(action.type).to.equal(types.DOING_USER_CHANGE_PASSWORD)
		})

	})

	describe('#userChangePasswordSuccess()', function(){

		it('should return the correct action', function(){
			const store  = mockStore(defaultStore())
			const action = store.dispatch(actions.userChangePasswordSuccess())
			expect(action.type).to.equal(types.USER_CHANGE_PASSWORD_SUCCESS)
		})

	})

	describe('#userChangePasswordError()', function(){

		it('should return the correct action', function(){
			const store  = mockStore(defaultStore())
			const error  = 'error'
			const action = store.dispatch(actions.userChangePasswordError(error))
			expect(action.type).to.equal(types.USER_CHANGE_PASSWORD_ERROR)
			expect(action.error).to.equal(error)
		})

	})

})