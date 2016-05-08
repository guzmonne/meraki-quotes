import React from 'react'
import {mount, shallow} from 'enzyme'
import {expect} from 'chai'
import {Input} from 'react-bootstrap'

import MerakiQuotesEditVariablesForm from '../../../components/meraki_quotes/meraki-quotes-edit-variables-form.component.js'

import {quote} from './meraki-quotes.fixtures.js'

describe('<MerakiQuotesEditVariablesForm />', function(){
	
	const wrapper = shallow(
		<MerakiQuotesEditVariablesForm
			onUpdate={function(){}}
			model={quote}
		/>
	)

	it('should have a select box with options 9x5xNBD and 24x7x4', function(){
		expect(wrapper.find('[type="select"]')).to.have.length(1)
		expect(wrapper.find('option')).to.have.length(2)
	})

	describe('Hardware Input', function(){
		const input = wrapper.find(Input).get(1)

		it('should render the input label as "Margen de Hardware"', function(){
			expect(input.props.label).to.equal('Margen de Hardware')
		})

		it('should render the input type as "number"', function(){
			expect(input.props.type).to.equal('number')
		})

		it('should render its value as 20%', function(){
			expect(input.props.value).to.equal(20)
		})

		it('should NOT be disabled', function(){
			expect(input.props.disabled).to.be.false
		})

	})

	describe('Software Input', function(){
		const input = wrapper.find(Input).get(2)

		it('should render the input label as "Margen de Software"', function(){
			expect(input.props.label).to.equal('Margen de Software')
		})

		it('should render the input type as "number"', function(){
			expect(input.props.type).to.equal('number')
		})

		it('should render its value as 20%', function(){
			expect(input.props.value).to.equal(20)
		})

		it('should NOT be disabled', function(){
			expect(input.props.disabled).to.be.false
		})

	})

	describe('Service Input', function(){
		const input = wrapper.find(Input).get(3)

		it('should render the input label as "Margen de Servicio"', function(){
			expect(input.props.label).to.equal('Margen de Servicio')
		})

		it('should render the input type as "number"', function(){
			expect(input.props.type).to.equal('number')
		})

		it('should render its value as 30%', function(){
			expect(input.props.value).to.equal(30)
		})

		it('should BE disabled', function(){
			expect(input.props.disabled).to.be.true
		})

	})

	describe('Admin Input', function(){
		const input = wrapper.find(Input).get(4)

		it('should render the input label as "Margen de Admin."', function(){
			expect(input.props.label).to.equal('Margen de Admin.')
		})

		it('should render the input type as "number"', function(){
			expect(input.props.type).to.equal('number')
		})

		it('should render its value as 30%', function(){
			expect(input.props.value).to.equal(30)
		})

		it('should BE disabled', function(){
			expect(input.props.disabled).to.be.true
		})

	})


})