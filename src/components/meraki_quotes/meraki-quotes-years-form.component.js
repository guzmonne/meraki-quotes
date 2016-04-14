import React from 'react'
import {Input} from 'react-bootstrap'

class MerakiQuotesYearsForm extends React.Component {
	render(){
		const {onChange, defaultValue} = this.props

		return (
			<form className="form-horizontal" onSubmit={() => {}}>
				<Input
					type="select"
					label="Años"
					ref="years"
					onChange={() => {
						const LicenceYears = parseInt(this.refs.years.getValue()); 
						onChange({LicenceYears})
					}}
					defaultValue={defaultValue}
					labelClassName="col-xs-3"
					wrapperClassName="col-xs-9"
					className="MerakiQuotesEdit__years"
					>
					<option value="1">1</option>
					<option value="3">3</option>
					<option value="5">5</option>
					<option value="7">7</option>
					<option value="10">10</option>
				</Input>
			</form>
		)
	}
}

MerakiQuotesYearsForm.propTypes = {
	onChange: React.PropTypes.func,
	defaultValue: React.PropTypes.number
}

export default MerakiQuotesYearsForm