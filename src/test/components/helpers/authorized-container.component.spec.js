import React from 'react'
import {mount, shallow} from 'enzyme'
import {expect} from 'chai'

import AuthorizedContainer from '../../../components/helpers/authorized-container.component.js'

describe('<AuthorizedContainer />', function(){

	const NotAuthorizedComponent = () =>
		<div>I should not be shown</div>

	const AuthorizedComponent = () =>
		<div>I should be shown</div>

	const wrap = (permission, user, component) => mount(
		<AuthorizedComponent user={user} permission={permission}>
			{component}
		</AuthorizedComponent>
	)

	it('should not show the component if the user is not authorized', function(){
		const user = {
			permissions: ['has-access', 'has-also-access']
		}
		const wrapper = wrap('not-allowed', user, <NotAuthorizedComponent />)
		expect(wrapper.find(NotAuthorizedComponent)).to.have.length(0)
	})

	it('should not show the component if the user is invalid', function(){
		const wrapper = wrap('not-allowed', 'not a valid user', <NotAuthorizedComponent />)
		expect(wrapper.find(NotAuthorizedComponent)).to.have.length(0)
	})

	it('should not show the component if the user doent have a permissions array', function(){
		const wrapper = wrap('not-allowed', {invalid: 'keys'}, <NotAuthorizedComponent />)
		expect(wrapper.find(NotAuthorizedComponent)).to.have.length(0)
	})

	it('should show the component if the user is authorized', function(){
		const user = {
			permissions: ['has-access', 'has-also-access']
		}
		const wrapper1 = wrap('has-access', user, <AuthorizedComponent />)
		const wrapper2 = wrap('has-also-access', user, <AuthorizedComponent />)
		expect(wrapper1.find(AuthorizedComponent)).to.have.length(1)
		expect(wrapper2.find(AuthorizedComponent)).to.have.length(1)
	})

})