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
						console.log(value, this.refs.deal.props)
						const DealApproved = !this.refs.deal.props.checked
						onUpdate({DealApproved})
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