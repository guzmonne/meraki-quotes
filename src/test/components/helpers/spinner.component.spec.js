import React from 'react'
import {mount, shallow} from 'enzyme'
import {expect} from 'chai'

import Spinner from '../../../components/helpers/spinner.component.js'

describe('<Spinner />', function(){
	it('should have an icon element', function(){
		const wrapper = shallow(<Spinner />)
		expect(wrapper.find('i')).to.have.length(1)
	})

	it('should be spinning', function(){
		const wrapper = shallow(<Spinner />)
		expect(wrapper.find('.fa-spin')).to.have.length(1)
	})
})