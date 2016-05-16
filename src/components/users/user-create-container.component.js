import React from 'react'
import {Grid, Row, Col, Panel} from 'react-bootstrap'
//import UserCreateForm from './user-create-form.component.js'
import SignupForm from '../main/signup-form.component.js'

export default (props) =>
	<Grid className="UserCreate">
		<Row>
				
				<Col md={6} mdOffset={3}>
					<Panel>
						{(typeof props.signup.signupFormError === 'string' && !!props.signup.signupFormError) ? 
							<div className="alert alert-danger">
								{props.signup.signupFormError}
							</div>:
							null}
							<SignupForm {...props} />
					</Panel>
				</Col>
				
		</Row>
	</Grid>