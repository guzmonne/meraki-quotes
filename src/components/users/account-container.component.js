import React from 'react'
import {
	Col,
	FormGroup,
	ControlLabel,
	FormControl,
	HelpBlock,
	Checkbox
} from 'react-bootstrap'
import SidePanel from '../helpers/side-panel.component.js'

const AccountContainer = ({user}) =>
	<SidePanel title="Configuración de Cuenta">
		<Col xs={12}>
			<h5>Datos Personales</h5>
			<dt>ID</dt>
			<dd>{user.ID}</dd>
			<dt>Nombre</dt>
			<dd>{user.username}</dd>
			<dt>Email</dt>
			<dd>{user.email}</dd>
			<h5>Configuración</h5>
			<form>
				<FormGroup>
		      <ControlLabel>Idioma de Excel</ControlLabel>
		      <FormControl 
		      	componentClass="select"
		      	placeholder="Español"
		      >
		        <option value="Español">Español</option>
		        <option value="Ingles">Ingles</option>
		      </FormControl>
		    </FormGroup>
			</form>
		</Col>
	</SidePanel>

AccountContainer.propTypes = {
	user: React.PropTypes.object.isRequired
}

export default AccountContainer