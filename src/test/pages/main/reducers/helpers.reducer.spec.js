import {expect} from 'chai'
import _ from 'lodash'

import helpersReducer from '../../../../pages/main/reducers/helpers.reducer.js'
import * as types from '../../../../state/action-types.js'

import {falseStore} from '../../../state/false-store.js'

describe('Helpers Reducer', function(){
	describe('default', function(){
		const store = helpersReducer([], {})

		it('should have the isFetchingUserPermissions flag set to false', function(){
			expect(store.isFetchingUserPermissions).to.be.false
		})

		it('should have an empty userPermissions list', function(){
			expect(store.userPermissions).to.have.length(0)
		})

		it('should have the userPermissionsIndexError value set to undefined', function(){
			expect(store.userPermissionsIndexError).to.be.undefined
		})

	})

	describe(types.DOING_HELPERS_USER_PERMISSIONS_INDEX, function(){
		const store = helpersReducer([], {type: types.DOING_HELPERS_USER_PERMISSIONS_INDEX})

		it('should set the isFetchingUserPermissions flag to true', function(){
			expect(store.isFetchingUserPermissions).to.be.true
		})

	})

	describe(types.HELPERS_USER_PERMISSIONS_INDEX_SUCCESS, function(){
		const store = helpersReducer({userPermissionsIndexError: 'not undefined'}, {
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

	})

	describe(types.HELPERS_USER_PERMISSIONS_INDEX_ERROR, function(){
		const store = helpersReducer([], {
			type: types.HELPERS_USER_PERMISSIONS_INDEX_ERROR,
			error: 'This is a test error'
		})

		it('should set the new values as the userPermissions', function(){
			expect(store.userPermissionsIndexError).to.equal('This is a test error')
		})

	})
})