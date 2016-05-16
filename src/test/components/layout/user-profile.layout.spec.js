import React from 'react'
import {Provider} from 'react-redux'
import {mount, shallow} from 'enzyme'
import {expect} from 'chai'

import {falseStore} from '../../state/false-store.js'

import UserProfileLayout from '../../../components/layout/user-profile.layout.js'

describe('<UserProfileLayout />', function(){
	const wrapper = mount(
		<Provider store={falseStore()}><UserProfileLayout /></Provider>
	)

	const component = wrapper.find(UserProfileLayout)

	it('should be defined', function(){
		expect(component).length.to.be(1)
	})
})