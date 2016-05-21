import React from 'react'
import lodash from 'lodash'

import Spinner from './spinner.component.js'
import IfElse from './ifelse.component.js'

const {isFunction} = lodash

const LoadingContainer = ({loading, children}) => 
	<IfElse 
		test={loading}
		ifComponent={<Spinner />}
		elseComponent={children}
	/>

LoadingContainer.propTypes = {
	loading: React.PropTypes.oneOfType([
		React.PropTypes.bool,
		React.PropTypes.func
	]).isRequired,
	loadingComponent: React.PropTypes.element
}

export default LoadingContainer