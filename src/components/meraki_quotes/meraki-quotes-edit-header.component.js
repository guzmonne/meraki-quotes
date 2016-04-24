import React from 'react'
import moment from 'moment'
import {Row, Col, Dropdown, Button, MenuItem} from 'react-bootstrap'

const MerakiQuotesEditHeader = ({
	model,
	user,
	toggleModal,
	toggleCharts,
	toggleLog,
	isShowingCharts,
	isLogActivated
}) =>
	<Row>
		<Col sm={10}>
			<h4>
				<a className="text-info" href="javascript:void(0);" onClick={toggleModal}>
					<strong> {model.Name || 'Quote name goes here...'}</strong>
					<br/>
					<small>{model.Description || 'Descripción'}</small>
				</a>
			</h4>
		</Col>
		<Col sm={2} className="MerakiQuotesEdit__config_button">
			<Dropdown pullRight id="MerakiQuotesEditConfigButton">
				<Button bsRole="toggle" bsStyle="info">
					<i className="fa fa-cog"></i>
				</Button>
				<Dropdown.Menu bsRole="menu">
					<MenuItem onClick={toggleCharts}>
						<span className="MerakiQuotesEdit__config_button__menu_item">Mostrar Gráficas</span>
						{!!isShowingCharts && <span><i className="fa fa-check"></i></span>}
					</MenuItem>
					<MenuItem onClick={toggleLog}>
						<span className="MerakiQuotesEdit__config_button__menu_item">Modo Logaritmico</span>
						{!!isLogActivated && <span><i className="fa fa-check"></i></span>}
					</MenuItem>
				</Dropdown.Menu>
			</Dropdown>
		</Col>
		<Col sm={5}>
			<dt>Quote ID</dt>
			{/* TODO: Remove placeholder */}
			<dd>{model.ID || '862a40df-8f2c-4d19-ac73-46d7553ca4f9'}</dd>
		</Col>
		<Col sm={3}>
			<dt>Creado Por</dt>
			{/* TODO: Remove placeholder */}
			<dd>{model.UserName || 'Guzman Monne'}</dd>
		</Col>
		<Col sm={4}>
			<dt>Creado</dt>
			{/* TODO: Remove placeholder */}
			<dd>{moment(model.createdAt).format('DD/MM/YYYY HH:mm:ss') || (new Date()).toString().slice(0, 33)}</dd>
		</Col>
	</Row>

MerakiQuotesEditHeader.propTypes = {
	model: React.PropTypes.object,
	toggleModal: React.PropTypes.func
}

export default MerakiQuotesEditHeader