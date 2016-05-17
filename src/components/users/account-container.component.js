import React from 'react'
import {
	Col,
	Form,
	FormGroup,
	ControlLabel,
	FormControl,
	HelpBlock,
	Checkbox
} from 'react-bootstrap'
import SidePanel from '../helpers/side-panel.component.js'

class AccountContainer extends React.Component {
	constructor(props){
		super(props)

		this.change = this.change.bind(this)

		const {localStorage} = window

		const excelLanguage = localStorage && localStorage.excelLanguage ?
			localStorage.excelLanguage : 'sp'

		this.state = {excelLanguage}
	}

	change(e){
		const {value} = e.target
		if(window && window.localStorage)
			window.localStorage.excelLanguage = value
		this.setState({excelLanguage: value})
	}

	render(){
		const {user} = this.props

		return (
			<SidePanel title="Configuración de Cuenta">
				<Col xs={12}>
					<Form horizontal>
						<hr/>
						<h4>Datos Personales</h4>
						<FormGroup>
							<Col componentClass={ControlLabel} sm={2}>
								ID
							</Col>
							<Col sm={10}>
								<FormControl.Static>{user.ID}</FormControl.Static>
							</Col>
						</FormGroup>
						<FormGroup>
							<Col componentClass={ControlLabel} sm={2}>
								Nombre
							</Col>
							<Col sm={10}>
								<FormControl.Static>{user.username}</FormControl.Static>
							</Col>
						</FormGroup>
						<FormGroup>
							<Col componentClass={ControlLabel} sm={2}>
								Email
							</Col>
							<Col sm={10}>
								<FormControl.Static>{user.email}</FormControl.Static>
							</Col>
						</FormGroup>
						<h4>Configuración</h4>
						<FormGroup>
							<Col componentClass={ControlLabel} sm={2}>
								Idioma de Excel
							</Col>
							<Col sm={10}>
					      <FormControl 
					      	componentClass="select"
					      	placeholder="Español"
					      	value={this.state.excelLanguage}
					      	onChange={this.change}
					      >
					        <option value="sp">Español</option>
					        <option value="en">Ingles</option>
					      </FormControl>
							</Col>
						</FormGroup>
					</Form>
				</Col>
			</SidePanel>
		)
	}
}

AccountContainer.propTypes = {
	user: React.PropTypes.object.isRequired
}

export default AccountContainer