import React from 'react'
import SignupForm from './signup-form.component.js'

export default (props) => 
	<div className="row Signup">
		<div className="col-md-offset-4 col-md-4 Signup__form-container">
			{!!props.signup.message ? 
				<div className="alert alert-info">{props.signup.message}</div> : null}
			<SignupForm {...props} />
		</div>
	</div>