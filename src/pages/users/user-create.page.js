import React from 'react'
import {connect} from 'react-redux'
//import {doUserCreate} from './actions/users.actions.js'
import {signupFormSubmitError, doSignupUser} from '../main/actions/signup.actions.js'
import UserCreateContainer from '../../components/users/user-create-container.component.js'

class UserCreatePage extends React.Component {
	render(){
		const {signup, signupFormSubmitError, doSignupUser} = this.props
		return <UserCreateContainer
			onError={signupFormSubmitError}
			onSubmit={doSignupUser}
			signup={signup}
		/>
	}
}

const select = state => (
	{signup: state.signup}
)

const actions = {
	signupFormSubmitError,
	doSignupUser
}

export default connect(select, actions)(UserCreatePage)