import React from 'react'
import {mount, shallow} from 'enzyme'
import {expect} from 'chai'

import IfElse from '../../../components/helpers/ifelse.component.js'

describe('<IfElse />', function(){
	const IsTrueComponent  = () => <div>Is True</div>
	const IsFalseComponent = () => <div>Is False</div>

	const wrap = (ifComponent, elseComponent, test) => mount(
		<IfElse 
			ifComponent={ifComponent}
			elseComponent={elseComponent}
			test={test}
		/>
	)

	it('should render the ifComponent if the test function value is true', function(){
		expect(wrap(<IsTrueComponent />, <IsFalseComponent />, () => true).find(IfElse).text()).
			to.equal('Is True')
	})

	it('should render the elseCompoennt if the test function value is false', function(){
		expect(wrap(<IsTrueComponent />, <IsFalseComponent />, () => false).find(IfElse).text()).
			to.equal('Is False')
	})

	it('should render the ifComponent if the test value is true', function(){
		expect(wrap(<IsTrueComponent />, <IsFalseComponent />, true).find(IfElse).text()).
			to.equal('Is True')
	})

	it('should render the elseComponent if the test value is false', function(){
		expect(wrap(<IsTrueComponent />, <IsFalseComponent />, false).find(IfElse).text()).
			to.equal('Is False')
	})
})