import React from 'react'
import {Label, Input, Row, Col} from 'react-bootstrap'

export default class PermissionsForm extends React.Component {
	constructor(){
		super()
		this.submit = this.submit.bind(this)
	}

	submit(){
		const permission = this.refs.permission.getValue()
		if (permission === '0') return
		this.props.onSubmit(permission)
	}

	render(){
		const {permissions, currentPermissions} = this.props
		return (
			<Input wrapperClassName="input-wrapper">
				<Row>
					<Col xs={12}>
						<h6>Nuevo permiso</h6>
					</Col>
				</Row>
				<Row>
					<Col xs={10}>
						<Input type="select" ref="permission">
							{permissions.length === 0 ?
								<option value="0">Cargando...</option>
								:
								<option value="0">--seleccione un nuevo permiso--</option>
							}
							{permissions.filter(permission => currentPermissions.indexOf(permission) === -1).map((permission, i) =>
								<option key={i} value={permission}>{permission}</option>
							)}
						</Input>
					</Col>
					<Col xs={2}>
						<button 
							className="btn btn-block"
							onClick={this.submit}
							disabled={permissions.length === 0}>
							<i className="fa fa-plus"></i>
						</button>
					</Col>
				</Row>
			</Input>
		)
	}
}