import React from 'react'
import Spinner from '../helpers/spinner.component.js'

export default class SignupForm extends React.Component {
	constructor(){
		super()

		this.signup          = this.signup.bind(this)
		this.invalidPassword = this.invalidPassword.bind(this)
		this.invalidEmail    = this.invalidEmail.bind(this)
		this.emptyName       = this.emptyName.bind(this)
	}

	signup(e){
		e.preventDefault()

		const {onSubmit, onError} = this.props

		const attrs = {
			username: this.refs.username.value,
			email: this.refs.email.value,
			password: this.refs.password.value,
			verifyPassword: this.refs.verifyPassword.value
		}
		if (this.emptyName(attrs)) return onError({
			type: 'username',
			message: 'Ingrese el nombre del nuevo usuario'
		})
		if (this.invalidEmail(attrs)) return onError({
			type: 'email',
			message: 'Cuenta de correo invalida.'
		})
		if (this.invalidPassword(attrs)) return onError({
			type: 'password',
			message: 'Error en contraseña.'
		})

		onSubmit(attrs)
	}

	emptyName(attrs) {
		return attrs.username === ''
	}

	invalidEmail(attrs){
		return attrs.email === ''
	}

	invalidPassword(attrs){
		return (attrs.password === '' || attrs.password !== attrs.verifyPassword)
	}

	render(){
		const error = this.props.signup.signupFormError
		const {isSigningUp} = this.props.signup

		return (
			<form className="Signup__form" onSubmit={this.signup}>
				<legend>Nueva Cuenta</legend>
				{/*Nombre*/}
				<div className="form-group">
					<label>Nombre</label>
					<input type="text" className="form-control"  ref="username" placeholder="Nombre"/>
					<p className="help-block text-danger">
						{error.type === 'username' ? error.message : null}
					</p>
				</div>
				{/*Email*/}
				<div className="form-group">
					<label>Email</label>
					<input type="text" className="form-control"  ref="email" placeholder="Email"/>
					<p className="help-block text-danger">
						{error.type === 'email' ? error.message : null}
					</p>
				</div>
				{/*Password*/}
				<div className="form-group">
					<label>Password</label>
					<input type="password" className="form-control"  ref="password" placeholder="Password"/>
					<p className="help-block text-danger">
						{error.type === 'password' ? error.message : null}
					</p>
				</div>
				{/* Password Verification */}
				<div className="form-group">
					<label>Repetir Contraseña</label>
					<input type="password" className="form-control"  ref="verifyPassword" placeholder="Repetir Contraseña"/>
				</div>
				<button 
					type="submit"
					className="btn btn-primary"
					disabled={isSigningUp}
				>
					{!!isSigningUp ? <Spinner /> : 'Aceptar'}
				</button>
			</form>
		)
	}
}