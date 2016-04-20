import React from 'react'
import {Panel, Row, Col, Input} from 'react-bootstrap'
import {
	calculateUnifiedSolutionPrice,
	calculateAdminMonthlyPrice,
	calculateServiceMonthlyPrice,
	calculateHardwarePrice,
	formatMoney
} from '../../modules/meraki-quotes-devices.module.js'
import Spinner from '../helpers/spinner.component.js'

export default class MerakiQuotesEditTotals extends React.Component {
	render(){
		const {quote} = this.props

		return (
			Object.keys(quote).length === 0 ? <Spinner/> :
			<div>
				<h4>
					<a className="text-info" href="javascript:void(0);">
						<strong>
							Totales
						</strong>
					</a>
				</h4>
				<Panel>
					<h5 className="text-warning">
						<strong>Solución Unificada <sup>*</sup></strong>
					</h5>
					<Row className="MerakiQuotesEdit__total_row">
						<Col xs={6}>
							<p>Cuota Mensual</p>
						</Col>
						<Col xs={6}>
							<p>{formatMoney(calculateUnifiedSolutionPrice(quote))}</p>
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							<small>
								<sup>*</sup>Contrato a 36 meses obligatorio
							</small>
						</Col>
					</Row>
				</Panel>
				<Panel>
					<h5 className="text-success">
						<strong>Solución Administrada</strong>
					</h5>
					<Row className="MerakiQuotesEdit__total_row">
						<Col xs={6}>
							<p>Inversión Incial</p>
						</Col>
						<Col xs={6}>
							<p>{formatMoney(calculateHardwarePrice(quote.Devices, quote))}</p>
						</Col>
					</Row>
					<Row className="MerakiQuotesEdit__total_row">
						<Col xs={6}>
							<p>Cuota Mensual</p>
						</Col>
						<Col xs={6}>
							<p>{formatMoney(calculateAdminMonthlyPrice(quote))}</p>
						</Col>
					</Row>
				</Panel>
				<Panel>
					<h5 className="text-primary">
						<strong>Solución Tradicional</strong>
					</h5>
					<Row className="MerakiQuotesEdit__total_row">
						<Col xs={6}>
							<p>Inversión Incial</p>
						</Col>
						<Col xs={6}>
							<p>{formatMoney(calculateHardwarePrice(quote.Devices, quote))}</p>
						</Col>
					</Row>	
					<Row className="MerakiQuotesEdit__total_row">
						<Col xs={6}>
							<p>Cuota Mensual</p>
						</Col>
						<Col xs={6}>
							<p>{formatMoney(calculateServiceMonthlyPrice(quote))}</p>
						</Col>
					</Row>
				</Panel>
			</div>
		)
	}
}