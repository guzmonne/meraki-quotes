import React from 'react'
import {
	Grid,
	Row,
	Col,
	Form,
	FormGroup,
	FormControl,
	ControlLabel,
	Button,
	Panel
} from 'react-bootstrap'

import UserPermissionsPanel from './user-permissions-panel.component.js'
import InlineBlockDiv from '../helpers/inline-block-div.component.js'

class PermissionsContainer extends React.Component {
	constructor(){
		super()
		this.change = this.change.bind(this)
		this.state = {
			permission: ''
		}
	}

	change(e){
		this.setState({permission: e.target.value})
	}

	render(){
		const {loading, permissions, onCreate, onUpdate} = this.props
		const {permission} = this.state
		return (
			<Grid>
				
				<Row>
					<Col mdOffset={3} md={6}>
						<Panel>
							<Form inline>
								<FormGroup style={{width: '74%'}}>
									<ControlLabel style={{width: '24%'}}>Nuevo Permiso</ControlLabel>
									<InlineBlockDiv />
									<FormControl 
										type="text"
										value={permission}
										onChange={this.change}
										style={{width: '74%'}}
									/>
								</FormGroup>
								<InlineBlockDiv />
								<Button style={{width: '24%'}}>
									Crear Permiso
								</Button>
							</Form>
						</Panel>
					</Col>
				</Row>
				<Row>
					<Col mdOffset={3} md={6}>
						<UserPermissionsPanel
							loading={loading}
							permissions={permissions}
							showDelete={false}
						/>
					</Col>
				</Row>

			</Grid>
		)
	}
}

PermissionsContainer.propTypes = {
	loading   : React.PropTypes.bool,
	showDelete: React.PropTypes.bool,
	onCreate  : React.PropTypes.func,
	onDelete  : React.PropTypes.func
}

export default PermissionsContainer