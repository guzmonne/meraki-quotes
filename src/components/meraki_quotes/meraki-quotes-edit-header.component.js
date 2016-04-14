import React from 'react'
import moment from 'moment'
import {Row, Col} from 'react-bootstrap'

export default ({model, user}) =>
	<Row>
		<Col sm={12}>
			<h4>
				<a className="text-info" href="javascript:void(0);">
					<strong>Quote:</strong> {model.Name || 'Quote name goes here...'}
				</a>
			</h4>
		</Col>
		<Col sm={5}>
			<dt>Quote ID</dt>
			{/* TODO: Remove placeholder */}
			<dd>{model.ID || '862a40df-8f2c-4d19-ac73-46d7553ca4f9'}</dd>
		</Col>
		<Col sm={3}>
			<dt>Creado Por</dt>
			{/* TODO: Remove placeholder */}
			<dd>{user.Name || 'Guzman Monne'}</dd>
		</Col>
		<Col sm={4}>
			<dt>Creado</dt>
			{/* TODO: Remove placeholder */}
			<dd>{moment(model.createdAt).format('DD/MM/YYYY HH:mm:ss') || (new Date()).toString().slice(0, 33)}</dd>
		</Col>
	</Row>