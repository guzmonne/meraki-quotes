import React from 'react'
//import UserCreateForm from './user-create-form.component.js'
import SignupForm from '../main/signup-form.component.js'

export default (props) =>
	<div className="row UserCreate">
		<div className="col-md-offset-3 col-md-6">
			{(typeof props.signup.signupFormError === 'string' && !!props.signup.signupFormError) ? 
				<div className="alert alert-danger">
					{props.signup.signupFormError}
				</div>:
				null}
				<SignupForm {...props} />
		</div>
	</div>