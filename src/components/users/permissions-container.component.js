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
import UserPermissionsTable from './user-permissions-table.component.js'
import UserPermissionsForm  from './user-permissions-form.component.js'
import InlineBlockDiv from '../helpers/inline-block-div.component.js'
import LoadingContainer from '../helpers/loading-container.component.js'

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
		const {loading, permissions, onUpdate} = this.props
		const {permission} = this.state
		return (
			<Grid>
				<Row>
					<Col mdOffset={3} md={6}><h1>Permisos</h1></Col>
				</Row>
				<Row>
					<Col mdOffset={3} md={6}>
						<Panel>
							<UserPermissionsForm onSubmit={onUpdate}/>
						</Panel>
					</Col>
				</Row>
				<Row>
					<Col mdOffset={3} md={6}>
						<Panel>
							<LoadingContainer loading={loading}>
								<UserPermissionsTable permissions={permissions}/>
							</LoadingContainer>
						</Panel>
					</Col>
				</Row>

			</Grid>
		)
	}
}

PermissionsContainer.propTypes = {
	loading   : React.PropTypes.bool,
	showDelete: React.PropTypes.bool,
	onUpdate  : React.PropTypes.func,
	onIndex   : React.PropTypes.func
}

export default PermissionsContainer