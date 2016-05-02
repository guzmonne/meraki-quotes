import React from 'react'
import {Row, Col, Input, Button} from 'react-bootstrap'

import MerakiQuotesYearsForm from './meraki-quotes-years-form.component.js'
import MerakiQuotesDealForm from './meraki-quotes-deal-form.component.js'
import MerakiQuotesDiscountForm from './meraki-quotes-discount-form.component.js'
import MerakiQuotesEditActions from './meraki-quotes-edit-actions.component.js'

export default class MerakiQuotesEditSettings extends React.Component {
	render(){
		const {
			model,
			onUpdate,
			onRemoveDevice,
			isLogActivated
		} = this.props

		return (
			<Row className="MerakiQuotesEdit__settings_row">
				<Col sm={2}>
					<MerakiQuotesYearsForm
						value={model.LicenceYears || 1}
						onUpdate={onUpdate}
					/>
				</Col>
				<Col sm={2}>
					<MerakiQuotesDealForm
						value={model.DealApproved || true}
						onUpdate={onUpdate}
					/>
				</Col>
				<Col sm={3}>
					<MerakiQuotesDiscountForm 
						value={model.Discount || 0.43}
						onUpdate={onUpdate}
					/>
				</Col>
				<Col sm={5}>
					<MerakiQuotesEditActions 
						onRemoveDevice={onRemoveDevice}
						quote={model}
						isLogActivated={isLogActivated}
					/>
				</Col>
			</Row>
		)
	}
}