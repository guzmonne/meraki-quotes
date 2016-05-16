import React from 'react'
import {mount, shallow} from 'enzyme'
import {expect} from 'chai'
import sinon from 'sinon'

import {NavItem} from 'react-bootstrap'

import MenuConstructor from '../../../components/menus/menu-constructor.component.js'

describe('<MenuConstructor />', function(){

	const wrap = (title, className, links) => 
		mount(
			<MenuConstructor 
				title={title}
				className={className}
				links={links}
			/>
		)

	const title = 'My title example'
	const className = 'MyClassNameExample'
	const links = [
		{action: sinon.spy(), label: 'test1'},
		{action: sinon.spy(), label: 'test2'}
	]

	const wrapper = wrap(title, className, links)

	it('should be rendered with the given className', function(){
		expect(wrapper.find('.MyClassNameExample')).to.have.length(1)
	})

	it('should contain an h4 header with the given title', function(){
		const title = wrapper.find('h4')
		expect(title).to.have.length(1)
		expect(title.text()).to.equal('My title example')
	})

	it('should contain two NavItem elements', function(){
		expect(wrapper.find(NavItem)).to.have.length(2)
	})

	it('should output each link label as the body of each NavItem', function(){
		const navItems = wrapper.find(NavItem)
		navItems.forEach((item, i) => 
			expect(item.text()).to.equal(`test${i+1}`)
		)
	})

})
