import React from 'react'
import {mount, shallow} from 'enzyme'
import {expect} from 'chai'

import LoadingContainer from '../../../components/helpers/loading-container.component.js'
import Spinner from '../../../components/helpers/spinner.component.js'

const LoadingIsTrueComponent = () => <div>LoadingIsTrueComponent</div>
const LoadingIsFalseComponent = () => <div>LoadingIsFalseComponent</div>
const LoadingComponent = () => <div>LoadingComponent</div>

describe('<LoadingContainer />', function(){

	it('should render the Spinner component if the loading function returns true', function(){
		const wrapper = mount(
			<LoadingContainer loading={() => true}>
				<LoadingIsFalseComponent />
			</LoadingContainer>
		)
		expect(wrapper.find(Spinner)).to.have.length(1)
	})

	it('should render the Spinner component if the loading value is true', function(){
		const wrapper = mount(
			<LoadingContainer loading={true}>
				<LoadingIsFalseComponent />
			</LoadingContainer>
		)
		expect(wrapper.find(Spinner)).to.have.length(1)
	})

	it('should render the LoadingIsTrueComponent component if the loading function returns true', function(){
		const wrapper = mount(
			<LoadingContainer loading={() => false}>
				<LoadingIsTrueComponent />
			</LoadingContainer>
		)
		expect(wrapper.find(LoadingIsTrueComponent)).to.have.length(1)
	})

	it('should render the LoadingIsTrueComponent component if the loading value is true', function(){
		const wrapper = mount(
			<LoadingContainer loading={false}>
				<LoadingIsTrueComponent />
			</LoadingContainer>
		)
		expect(wrapper.find(LoadingIsTrueComponent)).to.have.length(1)
	})

})