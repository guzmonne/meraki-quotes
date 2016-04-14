import React from 'react'
import {Input} from 'react-bootstrap'

class MerakiQuotesDealForm extends React.Component {
	render(){
		const {onChange, defaultValue} = this.props

		return (
			<form className="form-horizontal">
				<Input 
					ref="deal"
					onChange={() => {
						const DealApproved = this.refs.deal.getChecked()
						onChange({DealApproved})
					}}
					type="checkbox"
					defaultValue={defaultValue}
					label="Deal"
				/>
			</form>
		)
	}
}

MerakiQuotesDealForm.propTypes = {
	onChange: React.PropTypes.func,
	defaultValue: React.PropTypes.bool
}

export default MerakiQuotesDealForm