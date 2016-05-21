import React from 'react'
import {
	Label,
	Row,
	Col,
	FormGroup,
	ControlLabel,
	FormControl,
	Radio
} from 'react-bootstrap'

import IfElse from '../helpers/ifelse.component.js'

export default class PermissionsForm extends React.Component {
	constructor(){
		super()
		this.changeOption      = this.changeOption.bind(this)
		this.submit            = this.submit.bind(this)
		this.permissionOptions = this.permissionOptions.bind(this)
		this.isAdmin           = this.isAdmin.bind(this)
		this.state  = { option: null }
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

	permissionOptions(){
		return this.props.permissions.
			filter(permission => this.props.currentPermissions.indexOf(permission) === -1).
			map((permission, i) => <option key={i} value={permission}>{permission}</option>)
	}

	isAdmin(){
		const {permissions, currentPermissions} = this.props
		if (permissions.length === 0 && currentPermissions.length === 0)
			return false
		return permissions.length === currentPermissions.length
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
								placeholder="--seleccione un nuevo permiso--"
								value={this.state.option}
								onChange={this.changeOption}
							>
							<IfElse 
								ifComponent={<option value="0">Cargando...</option>}
								elseComponent={<option value="0">--seleccione un nuevo permiso--</option>}
								test={permissions.length === 0}
							/>
							{this.permissionOptions()}
							</FormControl>
						</FormGroup>
						<FormGroup>
							<Radio inline checked={this.isAdmin()}>
								Admin
							</Radio>
							<Radio inline>
								User
							</Radio>
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