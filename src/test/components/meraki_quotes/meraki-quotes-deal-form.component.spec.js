import React from 'react'
import {mount, shallow} from 'enzyme'
import {expect} from 'chai'
import {Checkbox} from 'react-bootstrap'

import MerakiQuotesDealForm from '../../../components/meraki_quotes/meraki-quotes-deal-form.component.js'

import {quote} from './meraki-quotes.fixtures.js'

describe('<MerakiQuotesDealForm />', function(){
	
	const updateSpy = function(){}

	const wrap = (_quote_) => 
		mount(
			<MerakiQuotesDealForm
				onUpdate={updateSpy}
				value={_quote_.DealApproved || false}
			/>
		)
	
	const wrapper = wrap(quote)

	it('should contain a checkbox', function(){
		expect(wrapper.find('input[type="checkbox"]')).to.have.length(1)
		expect(wrapper.find(Checkbox)).to.have.length(1)
	})

	it('should not be checked if DealApproved === false', function(){
		const checkbox = wrapper.find(Checkbox).get(0)
		expect(checkbox.props.checked).to.be.false
	})

	it('should be checked if DealApproved === true', function(){
		const _wrapper = wrap(Object.assign({}, quote, {DealApproved: true}))
		const checkbox = _wrapper.find(Checkbox).get(0)
		expect(checkbox.props.checked).to.be.true
	})
})