import {expect} from 'chai'
import _ from 'lodash'

import merakiQuotesReducer from '../../../../pages/meraki_quotes/reducers/meraki-quotes.reducer.js'
import * as types from '../../../../state/action-types.js'

import {falseStore} from '../../../state/false-store.js'

describe('Meraki Quotes Reducer', function(){
	describe('default', function(){
		const store = merakiQuotesReducer({
			isShowingCloneMerakiQuoteModal: false
		}, {})

		it('should set the isShowingCloneMerakiQuoteModal to false', function(){
			expect(store.isShowingCloneMerakiQuoteModal).to.be.false
		})
	})

	describe('TOOGLE_CLONE_MERAKI_QUOTE_MODAL', function(){

		it('should toggle the value of isShowingCloneMerakiQuoteModal from false to true', function(){
			const store = merakiQuotesReducer({
				isShowingCloneMerakiQuoteModal: false
			}, {
				type: types.TOOGLE_CLONE_MERAKI_QUOTE_MODAL
			})
			expect(store.isShowingCloneMerakiQuoteModal).to.be.true
		})

		it('should toggle the value of isShowingCloneMerakiQuoteModal from false to true', function(){
			const store = merakiQuotesReducer({
				isShowingCloneMerakiQuoteModal: true
			}, {
				type: types.TOOGLE_CLONE_MERAKI_QUOTE_MODAL
			})
			expect(store.isShowingCloneMerakiQuoteModal).to.be.false
		})

	})

})