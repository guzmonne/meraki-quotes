import React from 'react'
import {Panel, Row, Col, Input} from 'react-bootstrap'

export default class MerakiQuotesEditTotals extends React.Component {
	render(){
		return (
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
							<p>{'$1562.00'}</p>
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
							<p>{'$15602.00'}</p>
						</Col>
					</Row>
					<Row className="MerakiQuotesEdit__total_row">
						<Col xs={6}>
							<p>Cuota Mensual</p>
						</Col>
						<Col xs={6}>
							<p>{'$1562.00'}</p>
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
							<p>{'$15602.00'}</p>
						</Col>
					</Row>	
					<Row className="MerakiQuotesEdit__total_row">
						<Col xs={6}>
							<p>Cuota Mensual</p>
						</Col>
						<Col xs={6}>
							<p>{'$1562.00'}</p>
						</Col>
					</Row>
				</Panel>
			</div>
		)
	}
}