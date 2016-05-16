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

const ChangePasswordContainer = ({user}) =>
	<SidePanel title="Cambio de Contraseña">
		<Col xs={12}>
			<form>
				<FormGroup>
					<ControlLabel>Contraseña Actual</ControlLabel>
					<FormControl 
						type="password"
					/>
				</FormGroup>
				<FormGroup>
					<ControlLabel>Nueva Contraseña</ControlLabel>
					<FormControl 
						type="password"
					/>
				</FormGroup>
				<FormGroup>
					<ControlLabel>Repetir Contraseña</ControlLabel>
					<FormControl 
						type="password"
					/>
				</FormGroup>
			</form>
		</Col>
	</SidePanel>

export default ChangePasswordContainer