import React from 'react'
import {Input} from 'react-bootstrap'

class MerakiQuotesYearsForm extends React.Component {
	render(){
		const {onUpdate, value} = this.props

		return (
			<form className="form-horizontal">
				<Input
					type="number"
					label="Descuento (%)"
					ref="discount"
					value={Math.round((value || 0.43) * 100)}
					labelClassName="col-xs-7"
					wrapperClassName="col-xs-5"
					onChange={() => {
						// Need to calculate the discount as a percentage
						const Discount = +this.refs.discount.getValue() / 100;
						onUpdate({Discount})
					}}
				/>
			</form>
		)
	}
}

MerakiQuotesYearsForm.propTypes = {
	onChange: React.PropTypes.func,
	value: React.PropTypes.number
}

export default MerakiQuotesYearsForm