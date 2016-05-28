import React from 'react'
import {toastr} from 'react-redux-toastr'
import {
	Col,
	FormGroup,
	ControlLabel,
	FormControl,
	HelpBlock,
	Checkbox,
	Button
} from 'react-bootstrap'
import SidePanel from '../helpers/side-panel.component.js'

class ChangePasswordContainer extends React.Component {
	constructor(){
		super()
		this.change       = this.change.bind(this)
		this.submit       = this.submit.bind(this)
		this.canSubmit    = this.canSubmit.bind(this)
		this.defaultState = this.defaultState.bind(this)
		this.state        = this.defaults
	}

	defaultState(){
		this.setState(this.defaults)
	}

	canSubmit(){
		const {clearPassword, clearPasswordConfirmation, newPassword} = this.state
		return clearPassword !== "" && 
		       clearPassword === clearPasswordConfirmation &&
		       newPassword.length > 3 &&
		       !this.props.updating
	}

	submit(e){
		e.preventDefault()
		const {clearPassword, newPassword} = this.state
		const {onSubmit} = this.props
		if(!this.canSubmit()) return
		onSubmit(clearPassword, newPassword).
			subscribe(
				() => {
					toastr.success('Contraseña Actualizada correctamente.')
					this.defaultState()
				},
				() => {
					toastr.error('La contraseña ingresada no es correcta.')
				}
			)		
	}

	change(value, key){
		this.setState(Object.assign({}, this.state, {[key]: value}))
	}

	render(){
		const {onSubmit} = this.props
		return (
			<SidePanel title="Cambio de Contraseña">
				<Col xs={12}>

					<form onSubmit={this.submit}>
						<FormGroup>
							<ControlLabel>Contraseña Actual</ControlLabel>
							<FormControl
								onChange={(e) => this.change(e.target.value, 'clearPassword')}
								value={this.state.clearPassword}
								type="password"
							/>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Repetir Contraseña</ControlLabel>
							<FormControl
								onChange={(e) => this.change(e.target.value, 'clearPasswordConfirmation')} 
								value={this.state.clearPasswordConfirmation}
								type="password"
							/>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Nueva Contraseña</ControlLabel>
							<FormControl
								onChange={(e) => this.change(e.target.value, 'newPassword')} 
								value={this.state.newPassword}
								type="password"
							/>
							<HelpBlock>Utilice más de 3 cáracteres</HelpBlock>
						</FormGroup>
						<Button
							type="submit"
							disabled={!this.canSubmit()}
						>
							Cambiar Contraseña
						</Button>
					</form>
				</Col>
			</SidePanel>
		)
	}
}

ChangePasswordContainer.prototype.defaults = {
	newPassword              : '',
	clearPassword            : '',
	clearPasswordConfirmation: ''
}

ChangePasswordContainer.propTypes = {
	onSubmit: React.PropTypes.func.isRequired,
	updating: React.PropTypes.bool.isRequired
}

export default ChangePasswordContainer