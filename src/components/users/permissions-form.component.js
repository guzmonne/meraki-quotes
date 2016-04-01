import React from 'react'
import {Label, Input, Row, Col} from 'react-bootstrap'

export default class PermissionsForm extends React.Component {
	constructor(){
		super()
		this.submit = this.submit.bind(this)
	}

	submit(){}

	render(){
		const {permissions} = this.props
		return (
			<Input wrapperClassName="input-wrapper">
				<Row>
					<Col xs={12}>
						<h6>Nuevo permiso</h6>
					</Col>
				</Row>
				<Row>
					<Col xs={10}>
						<Input type="select">
							<option value="0">--seleccione un nuevo permiso--</option>
							{permissions.map(permission =>
								<option value={permission}>{permission}</option>
							)}
						</Input>
					</Col>
					<Col xs={2}>
						<button className="btn btn-block">
							<i className="fa fa-plus"></i>
						</button>
					</Col>
				</Row>
			</Input>
		)
	}
}