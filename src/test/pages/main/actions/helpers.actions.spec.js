import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {expect} from 'chai'

import Rx from 'rx'

import * as actions from '../../../../pages/main/actions/helpers.actions.js'
import * as types from '../../../../state/action-types.js'
import AwsApiObservers from '../../../../modules/aws-api-observers.module.js'

import * as Helpers from '../../../helpers/test.helpers.js'

const mockStore = configureMockStore([thunk])
const mock  = {
	status: 200,
	response: {
		values: [1, 2, 3]
	}
}
const defaultStore = (defaults) => Object.assign({}, {
	helpers: {
		userPermissions: [],
		isFetchingUserPermissions: false
	}
}, defaults)

describe('Helpers Actions', function(){

	/**
	 * Helpers User Permissions Index Specs
	 */
	describe('#doHelpersUserPermissionsIndex()', function(){

		const helpersUserPermissionsIndexObsBak = Helpers.clone(AwsApiObservers.helpersUserPermissionsIndexObs)

		before(function(){
			AwsApiObservers.helpersUserPermissionsIndexObs = () => Rx.Observable.just(mock)
		})

		after(function(){
			AwsApiObservers.helpersUserPermissionsIndexObs = helpersUserPermissionsIndexObsBak
		})

		it('should call the DOING_HELPERS_USER_PERMISSIONS_INDEX action', function(done){
			const store = mockStore(defaultStore())
			store.dispatch(actions.doHelpersUserPermissionsIndex()).
				subscribe(
					(r) => console.log('Response', r),
					(e) => console.log('Error ', e),
					( ) => {
						expect(store.getActions()[0].type).to.equal(types.DOING_HELPERS_USER_PERMISSIONS_INDEX)
						done()
					}
				)
		})

		it('should call the HELPERS_USER_PERMISSIONS_INDEX_SUCCESS action with the correct values', function(done){
			const store = mockStore(defaultStore())
			store.dispatch(actions.doHelpersUserPermissionsIndex()).
				subscribe(
					(r) => console.log('Response', r),
					(e) => console.log('Error ', e),
					( ) => {
						expect(store.getActions()[1].type).to.equal(types.HELPERS_USER_PERMISSIONS_INDEX_SUCCESS)
						expect(store.getActions()[1].values).to.equal(mock.response.values)
						done()
					}
				)
		})

		it('should call the HELPERS_USER_PERMISSIONS_INDEX_ERROR action if an error is found', function(done){
			const store = mockStore(defaultStore())
			const error = new Error('I am an error')
			AwsApiObservers.helpersUserPermissionsIndexObs = () => Rx.Observable.throw(error)
			store.dispatch(actions.doHelpersUserPermissionsIndex()).
				subscribe(
					(r) => console.log('Response', r),
					(e) => {
						expect(store.getActions()[1].type).to.equal(types.HELPERS_USER_PERMISSIONS_INDEX_ERROR)
						expect(store.getActions()[1].error).to.equal(error)
						done()
					},
					( ) => {}
				)
		})

	})

	describe('#doingHelpersUserPermissionsIndex()', function(){

		it('should return the correct action', function(){
			const store  = mockStore(defaultStore())
			const action = store.dispatch(actions.doingHelpersUserPermissionsIndex())
			expect(action.type).to.equal(types.DOING_HELPERS_USER_PERMISSIONS_INDEX)
		})

	})

	describe('#helpersUserPermissionsIndexSuccess()', function(){

		it('should return the correct action', function(){
			const store  = mockStore(defaultStore())
			const values = [1, 2, 3]
			const action = store.dispatch(actions.helpersUserPermissionsIndexSuccess(values))
			expect(action.type).to.equal(types.HELPERS_USER_PERMISSIONS_INDEX_SUCCESS)
			expect(action.values).to.equal(values)
		})

	})

	describe('#helpersUserPermissionsIndexError()', function(){

		it('should return the correct action', function(){
			const store  = mockStore(defaultStore())
			const error  = new Error('I am an error')
			const action = store.dispatch(actions.helpersUserPermissionsIndexError(error))
			expect(action.type).to.equal(types.HELPERS_USER_PERMISSIONS_INDEX_ERROR)
			expect(action.error).to.equal(error)
		})

	})

	/**
	 * Helpers User Permissions Update Specs
	 */
	
	describe('#doHelpersUserPermissionsUpdate()', function(){

		const helpersUserPermissionsUpdateObsBak = Helpers.clone(AwsApiObservers.helpersUserPermissionsUpdateObs)

		before(function(){
			AwsApiObservers.helpersUserPermissionsUpdateObs = () => Rx.Observable.just(mock)
		})

		after(function(){
			AwsApiObservers.helpersUserPermissionsUpdateObs = helpersUserPermissionsUpdateObsBak
		})

		it('should call the DOING_HELPERS_USER_PERMISSIONS_UPDATE action', function(done){
			const state = defaultStore({
				helpers: {
					userPermissions: [{method: 'POST', url: '/some/other/url', permission: 'some-other-description'}]
				}
			})
			const store = mockStore(state)
			const permission = {method: 'GET', url: '/some/url', permission: 'some-description'}
			store.dispatch(actions.doHelpersUserPermissionsUpdate(permission)).
				subscribe(
					(r) => console.log('Response', r),
					(e) => console.log('Error ', e),
					( ) => {
						expect(store.getActions()[0].type).to.equal(types.DOING_HELPERS_USER_PERMISSIONS_UPDATE)
						expect(store.getActions()[0].permissions[1]).to.equal(permission)
						done()
					}
				)
		})

		it('should call the HELPERS_USER_PERMISSIONS_UPDATE_SUCCESS action', function(done){
			const store = mockStore(defaultStore())
			store.dispatch(actions.doHelpersUserPermissionsUpdate()).
				subscribe(
					(r) => console.log('Response', r),
					(e) => console.log('Error ', e),
					( ) => {
						expect(store.getActions()[0].type).to.equal(types.DOING_HELPERS_USER_PERMISSIONS_UPDATE)
						expect(store.getActions()[1].type).to.equal(types.HELPERS_USER_PERMISSIONS_UPDATE_SUCCESS)
						done()
					}
				)
		})

		it('should call the HELPERS_USER_PERMISSIONS_INDEX_ERROR action if an error is found', function(done){
			const error = new Error('I am an error')
			AwsApiObservers.helpersUserPermissionsUpdateObs = () => Rx.Observable.throw(error)
			const defaultPermissions = [{method: 'POST', url: '/some/other/url', permission: 'some-other-description'}]
			const state = defaultStore({
				helpers: {
					userPermissions: defaultPermissions
				}
			})
			const store = mockStore(state)
			const permission = {method: 'GET', url: '/some/url', permission: 'some-description'}
			store.dispatch(actions.doHelpersUserPermissionsUpdate(permission)).
				subscribe(
					(r) => console.log('Response', r),
					(e) => {
						expect(store.getActions()[1].type).to.equal(types.HELPERS_USER_PERMISSIONS_UPDATE_ERROR)
						expect(store.getActions()[1].error).to.equal(error)
						expect(store.getActions()[1].permissions).to.equal(defaultPermissions)
						done()
					},
					( ) => {}
				)
		})

	})

	describe('#doingHelpersUserPermissionsUpdate()', function(){

		it('should return the correct action', function(){
			const store  = mockStore(defaultStore())
			const permissions = [1, 2, 3]
			const action = store.dispatch(actions.doingHelpersUserPermissionsUpdate(permissions))
			expect(action.type).to.equal(types.DOING_HELPERS_USER_PERMISSIONS_UPDATE)
			expect(action.permissions).to.equal(permissions)
		})

	})

	describe('#helpersUserPermissionsUpdateSuccess()', function(){

		it('should return the correct action', function(){
			const store  = mockStore(defaultStore())
			const action = store.dispatch(actions.helpersUserPermissionsUpdateSuccess())
			expect(action.type).to.equal(types.HELPERS_USER_PERMISSIONS_UPDATE_SUCCESS)
		})

	})

	describe('#helpersUserPermissionsUpdateError()', function(){

		it('should return the correct action', function(){
			const store  = mockStore(defaultStore())
			const error  = new Error('I am an error')
			const permissions = [1, 2, 3]
			const action = store.dispatch(actions.helpersUserPermissionsUpdateError(error, permissions))
			expect(action.type).to.equal(types.HELPERS_USER_PERMISSIONS_UPDATE_ERROR)
			expect(action.error).to.equal(error)
			expect(action.permissions).to.equal(permissions)
		})

	})

})

