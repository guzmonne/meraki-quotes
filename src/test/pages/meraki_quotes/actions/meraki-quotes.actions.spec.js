import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {expect} from 'chai'

import Rx from 'rx'

import * as actions from '../../../../pages/meraki_quotes/actions/meraki-quotes.actions.js'
import * as types from '../../../../state/action-types.js'
import AwsApiObservers from '../../../../modules/aws-api-observers.module.js'

import * as Helpers from '../../../helpers/test.helpers.js'

const mockStore = configureMockStore([thunk])

const defaultStore = (defaults) => Object.assign({}, {
	merakiQuotes: {
		isShowingCloneMerakiQuoteModal: false
	}
}, defaults)

describe('Meraki Quotes Actions', function(){

	describe('#toggleCloneMerakiQuoteModal()', function(){

		it('should call the TOOGLE_CLONE_MERAKI_QUOTE_MODAL', function(){
			const store  = mockStore(defaultStore())
			const action = store.dispatch(actions.toggleCloneMerakiQuoteModal())
			expect(action.type).to.equal(types.TOOGLE_CLONE_MERAKI_QUOTE_MODAL)
		})

	})

})