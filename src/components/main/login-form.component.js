import React from 'react'
import Spinner from '../helpers/spinner.component.js'

export default class LoginForm extends React.Component {
	constructor(){
		super()

		this.login = this.login.bind(this)
	}

	login(e){
		e.preventDefault()
		const user = {
			email: this.refs.email.value,
			password: this.refs.password.value
		}
		
		if (user.email === '') return this.props.onError('Cuenta de correo invalida.')
		if (user.password === '') return this.props.onError('Contraseña invalida.')

		this.props.onLogin(user)
	}

	render(){
		const {isLoggingIn} = this.props.login

		return (
			<form className="Login__form" onSubmit={this.login}>
				<legend>Iniciar Sesión</legend>
				{/*Email*/}
				<div className="form-group">
					<label>Email</label>
					<input type="text" className="form-control" ref="email" placeholder="Email"/>
				</div>
				{/*Password*/}
				<div className="form-group">
					<label>Password</label>
					<input type="password" className="form-control" ref="password" placeholder="Password"/>
				</div>
				<button 
					type="submit"
					className="btn btn-primary"
					disabled={isLoggingIn}
				>
					{!!isLoggingIn ? <Spinner /> : 'Aceptar'}
				</button>
			</form>
		)
	}
}