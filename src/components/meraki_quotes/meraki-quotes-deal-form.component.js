import React from 'react'
import {Input, Checkbox} from 'react-bootstrap'

class MerakiQuotesDealForm extends React.Component {
	render(){
		const {onUpdate, value} = this.props

		return (
			<form className="form-horizontal">
				<Checkbox 
					checked={value}
					ref="deal"
					onChange={() => {
						const DealApproved = !this.refs.deal.props.checked
						const Discount = !!DealApproved ? 0.43 : 0.35
						onUpdate({DealApproved, Discount})
					}}>
      		Deal
    		</Checkbox>
			</form>
		)
	}
}

MerakiQuotesDealForm.propTypes = {
	onUpdate: React.PropTypes.func,
	value: React.PropTypes.bool
}

export default MerakiQuotesDealForm