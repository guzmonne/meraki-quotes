import React from 'react'
import {Input} from 'react-bootstrap'

class MerakiQuotesYearsForm extends React.Component {
	render(){
		const {onChange, defaultValue} = this.props

		return (
			<form className="form-horizontal">
				<Input
					type="number"
					label="Descuento"
					ref="discount"
					addonAfter="%"
					defaultValue={43}
					labelClassName="col-xs-6"
					wrapperClassName="col-xs-5"
					onChange={() => {
						const Discount = parseInt(this.refs.discount.getValue()); 
						onChange({Discount})
					}}
				/>
			</form>
		)
	}
}

MerakiQuotesYearsForm.propTypes = {
	onChange: React.PropTypes.func,
	defaultValue: React.PropTypes.number
}

export default MerakiQuotesYearsForm