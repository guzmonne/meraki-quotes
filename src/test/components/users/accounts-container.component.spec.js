import React from 'react'
import ReactDOM from 'react-dom'
import {mount, shallow} from 'enzyme'
import {expect} from 'chai'
import {FormGroup, FormControl} from 'react-bootstrap'

import AccountContainer from '../../../components/users/account-container.component.js'

import {users} from './users.fixtures.js'

const user = users.account

describe('<AccountContainer />', function(){

	beforeEach(function(){
		window.localStorage = {}
	})

	const wrap = () => mount(<AccountContainer user={user} />)

	const wrapper = mount(<AccountContainer user={user} />)

	const dds = wrapper.find(FormControl.Static)


	it('should render the user information', function(){
		expect(dds.at(0).text()).to.equal('1234')
		expect(dds.at(1).text()).to.equal('Test Name')
		expect(dds.at(2).text()).to.equal('test@example.com')
	})

	it('should have the @excelLanguage value stored inside its state', function(){
		expect(wrapper.state().excelLanguage).to.equal('sp')
	})

	it('should read the stored @excelLanguage value stored inside localStorage upon construction', function(){
		window.localStorage = {excelLanguage: 'jp'}
		expect(wrap().state().excelLanguage).to.equal('jp')
	})

	it('should change the value of the @excelLanguage upon a change on the select box', function(){
		expect(wrapper.state().excelLanguage).to.equal('sp')
		wrapper.find(FormControl).simulate('change', {target: {value: 'en'}})
		expect(wrapper.state().excelLanguage).to.equal('en')
	})

})