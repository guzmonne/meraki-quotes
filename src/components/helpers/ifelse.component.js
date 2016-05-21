import React from 'react'
import lodash from 'lodash'

const {isFunction} = lodash

const IfElse = ({ifComponent, elseComponent, test}) => {
	const testValue = isFunction(test) ? test() : test
	if (testValue === true)
		return ifComponent
	else if (testValue === false)
		return elseComponent
	else
		return <div>Wrong Test</div>
}

IfElse.propTypes = {
	ifComponent  : React.PropTypes.element.isRequired,
	elseComponent: React.PropTypes.element.isRequired,
	test         : React.PropTypes.oneOfType([
		React.PropTypes.bool,
		React.PropTypes.func
	]).isRequired
}

export default IfElse