import React from 'react'
import {Row, Col, Input, Button} from 'react-bootstrap'

import MerakiQuotesYearsForm from './meraki-quotes-years-form.component.js'
import MerakiQuotesDealForm from './meraki-quotes-deal-form.component.js'
import MerakiQuotesDiscountForm from './meraki-quotes-discount-form.component.js'
import MerakiQuotesEditActions from './meraki-quotes-edit-actions.component.js'

export default class MerakiQuotesEditSettings extends React.Component {
	render(){
		const {model} = this.props

		return (
			<Row className="MerakiQuotesEdit__settings_row">
				<Col sm={2}>
					<MerakiQuotesYearsForm
						defaultValue={model.Years || 1}
						onChange={years => console.log(years)}
					/>
				</Col>
				<Col sm={1}>
					<MerakiQuotesDealForm
						defaultValue={model.DealApproved || true}
						onChange={deal => console.log(deal)}
					/>
				</Col>
				<Col sm={4}>
					<MerakiQuotesDiscountForm 
						defaultValue={model.Discount || 43}
						onChange={discount => console.log(discount)}
					/>
				</Col>
				<Col sm={5}>
					<MerakiQuotesEditActions />
				</Col>
			</Row>
		)
	}
}