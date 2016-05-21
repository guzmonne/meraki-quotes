import React from 'react'

const InlineBlockDiv = ({width='2%'}) =>
	<div style={{width: width, display: 'inline-block'}}></div>

InlineBlockDiv.propTypes = {
	width: React.PropTypes.string
}

export default InlineBlockDiv