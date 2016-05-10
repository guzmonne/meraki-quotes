import React from 'react'
import moment from 'moment'
import {Row, Col, Dropdown, Button, MenuItem} from 'react-bootstrap'

const MerakiQuotesEditHeader = ({
	model,
	user,
	toggleModal,
	toggleLog,
	isLogActivated
}) =>
	<Row>
		<Col sm={12}>
			<h4>
				<a className="text-info" href="javascript:void(0);" onClick={toggleModal}>
					<strong> {model.Name || 'Quote name goes here...'}</strong>
					<br/>
					<small>{model.Description || 'Descripción'}</small>
				</a>
			</h4>
		</Col>
		<Col sm={5}>
			<dt>Quote ID</dt>
			<dd>{model.ID || '862a40df-8f2c-4d19-ac73-46d7553ca4f9'}</dd>
		</Col>
		<Col sm={3}>
			<dt>Creado Por</dt>
			<dd>{model.UserName || 'Guzman Monne'}</dd>
		</Col>
		<Col sm={4}>
			<dt>Creado</dt>
			<dd>{moment(model.createdAt).format('DD/MM/YYYY HH:mm:ss') || (new Date()).toString().slice(0, 33)}</dd>
		</Col>
	</Row>

MerakiQuotesEditHeader.propTypes = {
	model: React.PropTypes.object,
	toggleModal: React.PropTypes.func
}

export default MerakiQuotesEditHeader