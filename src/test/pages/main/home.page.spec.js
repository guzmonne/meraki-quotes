import React from 'react'
import {Provider} from 'react-redux'
import _ from 'lodash'
import {mount, shallow} from 'enzyme'
import {expect} from 'chai'

import {falseStore} from '../../state/false-store.js'

import HomePage from '../../../pages/main/home.page.js'
import HomePageContainer from '../../../components/main/home-container.component.js'
import UsersMenu from '../../../components/menus/users-menu.component.js'
import MerakiQuotesMenu from '../../../components/menus/meraki-quotes-menu.component.js'
import UserProfileMenu from '../../../components/menus/user-profile-menu.component.js'

describe('< HomePage />', function(){

	const {isFunction} = _ /* lodash */
	
	const store = falseStore()

	const wrapper = mount(
		<Provider store={store}>
			<HomePage />
		</Provider>
	)

	const component = wrapper.find(HomePageContainer)

	const merakiQuotesMenu = wrapper.find(MerakiQuotesMenu)

	const usersMenu = wrapper.find(UsersMenu)

	const userProfileMenuComponent = wrapper.find(UserProfileMenu)

	it('should have the onMerakiQuoteCreate() method on its props', function(){
		const props = component.props()
		expect(isFunction(props.onMerakiQuoteCreate)).to.be.true
	})

	it('should contain the MerakiQuotesMenu component', function(){
		expect(merakiQuotesMenu).to.have.length(1)
	})

	it('should contain the UsersMenu component', function(){
		expect(usersMenu).to.have.length(1)
	})

	it('should contain the UserProfileMenu component', function(){
		expect(userProfileMenuComponent).to.have.length(1)
	})

})