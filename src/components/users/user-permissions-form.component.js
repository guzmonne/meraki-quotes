import React from 'react'
import {
	Form,
	FormGroup,
	FormControl,
	Col,
	Button
} from 'react-bootstrap'

class UserPermissionsForm extends React.Component {
	constructor(){
		super()
		this.change  = this.change.bind(this)
		this.submit  = this.submit.bind(this)
		this.default = this.default.bind(this)
		this.state   = this.default()
	} 

	default(){
		return {
			permission: {
				method    : '',
				url       : '',
				permission: ''
			}
		}
	}

	submit(){
		this.props.onSubmit(this.state.permission)
		this.state.permission = this.default()
	}

	change(value, key){
		this.setState({permission: {[key]: value}})
	}

	render(){ 
		const {permission} = this.state

		return (
			<Form horizontal onSubmit={this.submit}>
				<FormGroup>
					<Col sm={2}>Metodo</Col>
					<Col sm={10}>
						<FormControl 
							componentClass="select"
							value={permission.method}
							onChange={e => this.change(e.target.value, 'method')}
						>
							<option value="GET">GET</option>
							<option value="POST">POST</option>
							<option value="DELETE">DELETE</option>
							<option value="PUT">PUT</option>
						</FormControl>
					</Col>
				</FormGroup>
				<FormGroup>
					<Col sm={2}>URL</Col>
					<Col sm={10}>
						<FormControl 
							type="text" 
							value={permission.url}
							onChange={e => this.change(e.target.value, 'url')}
						/>
					</Col>
				</FormGroup>
				<FormGroup>
					<Col sm={2}>Permiso</Col>
					<Col sm={10}>
						<FormControl 
							type="text" 
							value={permission.permission}
							onChange={e => this.change(e.target.value, 'permission')}
						/>
					</Col>
				</FormGroup>
		    <FormGroup>
		      <Col smOffset={2} sm={10}>
		        <Button type="submit">
		          Crear Permiso
		        </Button>
		      </Col>
		    </FormGroup>
			</Form>
		)
	}
}

UserPermissionsForm.propTypes = {
	onSubmit: React.PropTypes.func.isRequired
}

export default UserPermissionsForm