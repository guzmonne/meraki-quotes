import React from 'react'
import {connect} from 'react-redux'
import {doLoginUser, loginUserError} from './actions/login.actions.js'
import LoginContainer from '../../components/main/login-container.component.js'

class Login extends React.Component {
	render(){
		const {doLoginUser, loginUserError, login} = this.props
		return <LoginContainer
			onLogin={doLoginUser}
			onError={loginUserError}
			login={login}
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