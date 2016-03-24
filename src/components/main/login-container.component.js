import React from 'react'
import LoginForm from './login-form.component.js'

export default (props) =>
	<div className="row Login">
		<div className="col-md-offset-4 col-md-4 Login__form-container">
			{!!props.login.error ? 
				<div className="alert alert-danger">{props.login.error}</div> : null}
			<LoginForm {...props} />
		</div>
	</div>