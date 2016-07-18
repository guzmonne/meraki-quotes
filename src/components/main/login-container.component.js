import React, {PropTypes as T} from 'react'
import LoginForm from './login-form.component.js'

const getAlertType = (type) => {
	switch(type){
		case 'error'  : return 'alert alert-danger';
		case 'info'   : return 'alert alert-info';
		case 'success': return 'alert alert-success';
		default       : return 'alert alert-default';
	}
}

const setMessage = (props) => {
	let type, message
	if (!!props.login.error) {
		message = 'Error de usuario o contraseña'
		type    = 'error'
	} else if (props.message && !!props.message.type){
		message = props.message.text
		type    = props.message.type
	} else {
		message = 'Bienvenido'
		type    = 'info'
	}
	const alertType = getAlertType(type)
	return <div className={alertType}>{message}</div>
}

const LoginContainer = (props) => {
	const message = setMessage(props)
	return (
		<div className="row Login">
			<div className="col-md-offset-4 col-md-4 Login__form-container">
				{message}
				<LoginForm {...props} />
			</div>
		</div>
	)
}

LoginContainer.propTypes = {
	login: T.object.isRequired
}

LoginContainer.defaultProps = {}

export default LoginContainer