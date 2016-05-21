import React from 'react'
import ReactDOM from 'react-dom'
import sinon from 'sinon'
import _ from 'lodash'
import {mount, shallow} from 'enzyme'
import {expect} from 'chai'
import {FormGroup, FormControl} from 'react-bootstrap'

import PermissionsForm from '../../../components/users/permissions-form.component.js'

import {users} from './users.fixtures.js'

describe('<PermissionsForm />', function(){
	const spies = {change: sinon.spy(), submit: sinon.spy()}
	const recover = Object.assign({}, _.pick(PermissionsForm, 'change', 'submit'))

	beforeEach(function(){
		PermissionsForm.prototype.change = spies.change
		PermissionsForm.prototype.submit = spies.submit
	})

	afterEach(function(){
		PermissionsForm.prototype.change = recover.change
		PermissionsForm.prototype.submit = recover.submit
	})

	const wrap = (permissions, currentPermissions) => mount(
		<PermissionsForm 
			permissions={permissions}
			currentPermissions={currentPermissions}
		/>
	)

	it('should say "Cargando..." if the permissions[] length equals 0', function(){
		const wrapper = wrap([], [])
		const option  = wrapper.find('option')
		expect(option).to.have.length(1)
		expect(option.at(0).text()).to.equal('Cargando...')
	})

	it('should say "--seleccione un nuevo permiso--" if the permissions[] length is bigger than 0', function(){
		const wrapper = wrap(['permission 1'], [])
		const option  = wrapper.find('option')
		expect(option).to.have.length(2)
		expect(option.at(0).text()).to.equal('--seleccione un nuevo permiso--')
		expect(option.at(1).text()).to.equal('permission 1')
	})

	it('should ony contain options from the difference between the permissions and currentPermissions', function(){
		const permissions        = ['permission1', 'permission2', 'permission3']
		const currentPermissions = ['permission2']
		const wrapper            = wrap(permissions, currentPermissions)
		const option             = wrapper.find('option')
		expect(option).to.have.length(3)
		expect(option.at(0).text()).to.equal('--seleccione un nuevo permiso--')
		expect(option.at(1).text()).to.equal('permission1')
		expect(option.at(2).text()).to.equal('permission3')
	})

	it('should call the change() method upon a change event on the select FormControl', function(){
		const permissions        = ['permission1', 'permission2', 'permission3']
		const currentPermissions = ['permission2']
		const wrapper            = wrap(permissions, currentPermissions)
		const formControl        = wrapper.find(FormControl)
		formControl.simulate('change', {target: {value: 'permission1'}})
		expect(spies.change).to.have.been.calledOnce
	})

	it('should call the submit() method upona a click event on the add button', function(){
		const permissions        = ['permission1', 'permission2', 'permission3']
		const currentPermissions = ['permission2']
		const wrapper            = wrap(permissions, currentPermissions)
		const button        = wrapper.find('button')
		button.simulate('click', {target: {value: 'permission1'}})
		expect(spies.submit).to.have.been.calledOnce
	})

})