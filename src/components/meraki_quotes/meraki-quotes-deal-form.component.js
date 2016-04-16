import React from 'react'
import {Input} from 'react-bootstrap'

class MerakiQuotesDealForm extends React.Component {
	render(){
		const {onUpdate, value} = this.props

		return (
			<form className="form-horizontal">
				<Input 
					ref="deal"
					onChange={() => {
						const DealApproved = this.refs.deal.getChecked()
						onUpdate({DealApproved})
					}}
					type="checkbox"
					value={value}
					label="Deal"
				/>
			</form>
		)
	}
}

MerakiQuotesDealForm.propTypes = {
	onUpdate: React.PropTypes.func,
	value: React.PropTypes.bool
}

export default MerakiQuotesDealForm