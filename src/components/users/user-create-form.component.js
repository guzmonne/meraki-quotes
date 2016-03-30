import React from 'react'

export default class UserCreateForm extends React.Component {
	constructor(props){
		super(props)
		this.create = this.create.bind(this)
		this.validate = this.validate.bind(this)
		this.state = this.props.users.current || {}
	}

	create(){}

	validate(){}

	render(){
		return (
			<form>
				<Input type="text" label="Nombre" placeholder="Nombre"></Input>
				<Input type="email" label="Email" placeholder="Email"></Input>
				<Input type="password" label="Contraseña" placeholder="Contraseña"></Input>
				<Input type="password" label="Validar Contraseña" placeholder="Validar Contraseña"></Input>
			</form>
		)
	}
}