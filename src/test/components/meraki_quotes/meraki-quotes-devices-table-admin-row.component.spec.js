import React from 'react'
import {mount, shallow} from 'enzyme'
import {expect} from 'chai'
import {Input} from 'react-bootstrap'

import MerakiQuotesDevicesTableAdminRow from '../../../components/meraki_quotes/meraki-quotes-devices-table-admin-row.component.js'

import {quote} from './meraki-quotes.fixtures.js'

describe('<MerakiQuotesDevicesTableAdminRow />', function(){
	
	const wrapper = shallow(
		<MerakiQuotesDevicesTableAdminRow
			model={quote}
		/>
	)

	const tds = wrapper.find('td')

	it('should contain a <tr> element', function(){
		expect(wrapper.find('tr')).to.have.length(1)
	})

	it('should have 9 <td> elements', function(){
		expect(tds).to.have.length(9)
	})

	it('should have a dash on its second cell', function(){
		const p = tds.get(2).props.children
		expect(p.type).to.equal('p')
		expect(p.props.children).to.equal('-')
	})

	it('should have the service cost properly formatted', function(){
		const p = tds.get(8).props.children
		expect(p.type).to.equal('p')
		expect(p.props.children).to.equal('$343,99')
	})

})