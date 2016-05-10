import React from 'react'
import {
	Label,
	Input,
	Row,
	Col,
	FormGroup,
	ControlLabel,
	FormControl}
from 'react-bootstrap'

export default class PermissionsForm extends React.Component {
	constructor(){
		super()
		this.state  = { option: null }
		this.changeOption = this.changeOption.bind(this)
		this.submit = this.submit.bind(this)
	}

	componentWillReceiveProps(newProps){
		this.setState({option: "0"})
	}

	changeOption(e){
		this.setState({option: e.target.value})
	}

	submit(){
		if (this.state.option === "0") return 
		this.props.onSubmit(this.state.option)
	}

	render(){
		const {permissions, currentPermissions} = this.props
		return (
			<Row>
				<Col xs={12}>
					<h6>Nuevo permiso</h6>
				</Col>
				<Col xs={10}>
					<form>
						<FormGroup controlId="permissionSelector">
							<FormControl 
								componentClass="select"
								placeholder="--seleccionar un nuevo permiso--"
								value={this.state.option}
								onChange={this.changeOption}
							>
							{permissions.length === 0 ?
								<option value="0">Cargando...</option>
								:
								<option value="0">--seleccione un nuevo permiso--</option>
							}
							{permissions.
								filter(permission => currentPermissions.indexOf(permission) === -1).
								map((permission, i) =>
									<option key={i} value={permission}>{permission}</option>
								)
							}
							</FormControl>
						</FormGroup>
					</form>
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
		)
	}
}