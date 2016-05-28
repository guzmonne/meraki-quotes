import React from 'react'
import {connect} from 'react-redux'
import {doUserChangePassword} from './actions/users.actions.js'
import ChangePasswordContainer from '../../components/users/change-password-container.component.js'

class ChangePasswordPage extends React.Component {
	render(){
		const {state, doUserChangePassword} = this.props
		return (
			<ChangePasswordContainer 
				onSubmit={doUserChangePassword}
			/>
		) 
	}
}

const select = state => (
	{state: state.users}
)

const actions = {
	doUserChangePassword
}

export default connect(select, actions)(ChangePasswordPage)