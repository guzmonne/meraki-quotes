import React from 'react'
import {connect} from 'react-redux'
import {doLoginUser, loginUserError} from './actions/login.actions.js'
import LoginContainer from '../../components/main/login-container.component.js'

class Login extends React.Component {
	constructor(){
		super()
		this.getMessageFromLocationQuery = this.getMessageFromLocationQuery.bind(this)
	}

	getMessageFromLocationQuery() {
		let message
		try {
			message = {
				type: 'error',
				text: this.props.location.query.Message,
			} 
		} catch (err) {
			message = false
		}
		return message
	}

	render(){
		const message = this.getMessageFromLocationQuery()
		const {doLoginUser, loginUserError, login} = this.props
		return <LoginContainer
			onLogin={doLoginUser}
			onError={loginUserError}
			login={login}
			message={message}
		/>
	}
}

const select = state => (
	{login: state.login}
)

const actions = {
	doLoginUser,
	loginUserError
}

export default connect(select, actions)(Login)