import {expect} from 'chai'
import _ from 'lodash'

import helpersReducer from '../../../../pages/main/reducers/helpers.reducer.js'
import * as types from '../../../../state/action-types.js'

import {falseStore} from '../../../state/false-store.js'

describe('Helpers Reducer', function(){
	describe('default', function(){
		const store = helpersReducer({
			isFetchingUserPermissions : false,
			isUpdatingUserPermissions : false,
			userPermissions           : [],
			userPermissionsIndexError : undefined,
			userPermissionsUpdateError: undefined
		}, {})

		it('should have the isFetchingUserPermissions flag set to false', function(){
			expect(store.isFetchingUserPermissions).to.be.false
		})

		it('should have the isUpdatingUserPermissions flag set to false', function(){
			expect(store.isUpdatingUserPermissions).to.be.false
		})

		it('should have an empty userPermissions list', function(){
			expect(store.userPermissions).to.have.length(0)
		})

		it('should have the userPermissionsIndexError value set to undefined', function(){
			expect(store.userPermissionsIndexError).to.be.undefined
		})

		it('should have the userPermissionsUpdateError value set to undefined', function(){
			expect(store.userPermissionsUpdateError).to.be.undefined
		})

	})

	describe(types.DOING_HELPERS_USER_PERMISSIONS_INDEX, function(){
		const store = helpersReducer({
			isFetchingUserPermissions: false
		}, {
			type: types.DOING_HELPERS_USER_PERMISSIONS_INDEX
		})

		it('should set the isFetchingUserPermissions flag to true', function(){
			expect(store.isFetchingUserPermissions).to.be.true
		})

	})

	describe(types.DOING_HELPERS_USER_PERMISSIONS_UPDATE, function(){
		const permissions = [1, 2, 3]
		const store = helpersReducer({
			isFetchingUserPermissions: false
		}, {
			type: types.DOING_HELPERS_USER_PERMISSIONS_UPDATE,
			permissions
		})

		it('should set the isUpdatingUserPermissions flag to true', function(){
			expect(store.isUpdatingUserPermissions).to.be.true
		})

		it('should set the new permissions values on the userPermissions store array', function(){
			expect(store.userPermissions).to.equal(permissions)
		})

	})

	describe(types.HELPERS_USER_PERMISSIONS_INDEX_SUCCESS, function(){
		const store = helpersReducer({
			userPermissionsIndexError: 'not undefined',
			isFetchingUserPermissions: true
		}, {
			type: types.HELPERS_USER_PERMISSIONS_INDEX_SUCCESS,
			values: [1]
		})

		it('should set the new values as the userPermissions', function(){
			expect(store.userPermissions).to.have.length(1)
			expect(store.userPermissions[0]).to.equal(1)
		})

		it('should set the userPermissionsIndexError to undefined', function(){
			expect(store.userPermissionsIndexError).to.be.undefined
		})

		it('should set the isFetchingUserPermissions flag to false', function(){
			expect(store.isFetchingUserPermissions).to.be.false
		})

	})

	describe(types.HELPERS_USER_PERMISSIONS_UPDATE_SUCCESS, function(){
		const store = helpersReducer({
			userPermissionsUpdateError: 'not undefined',
			isUpdatingUserPermissions: true
		}, {
			type: types.HELPERS_USER_PERMISSIONS_UPDATE_SUCCESS,
		})

		it('should set the userPermissionsUpdateError to undefined', function(){
			expect(store.userPermissionsUpdateError).to.be.undefined
		})

		it('should set the isUpdatingUserPermissions flag to false', function(){
			expect(store.isUpdatingUserPermissions).to.be.false
		})

	})

	describe(types.HELPERS_USER_PERMISSIONS_INDEX_ERROR, function(){
		const store = helpersReducer({
			isFetchingUserPermissions: true,
			userPermissionsIndexError: undefined,
		}, {
			type: types.HELPERS_USER_PERMISSIONS_INDEX_ERROR,
			error: 'This is a test error'
		})

		it('should set the userPermissionsIndexErrorValue', function(){
			expect(store.userPermissionsIndexError).to.equal('This is a test error')
		})

		it('should set the isFetchingUserPermissions flag to false', function(){
			expect(store.isFetchingUserPermissions).to.be.false
		})

	})

	describe(types.HELPERS_USER_PERMISSIONS_UPDATE_ERROR, function(){
		const permissions = [1, 2, 3]
		const store = helpersReducer({
			userPermissions: [1, 2, 3, 4],
			userPermissionsUpdateError: undefined,
			isUpdatingUserPermissions: true
		}, {
			type: types.HELPERS_USER_PERMISSIONS_UPDATE_ERROR,
			error: 'This is a test error',
			permissions
		})

		it('should set the old permissions on the userPermissions array', function(){
			expect(store.userPermissions).to.equal(permissions)
		})

		it('should set the userPermissionsUpdateError', function(){
			expect(store.userPermissionsUpdateError).to.equal('This is a test error')
		})

		it('should set the isUpdatingUserPermissions flag to false', function(){
			expect(store.isUpdatingUserPermissions).to.be.false
		})

	})
})