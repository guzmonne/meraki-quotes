import React from 'react'
import {connect} from 'react-redux'
import {signupFormSubmitError, doSignupUser} from './actions/signup.actions.js'
import SignupFormContainer from '../../components/main/signup-form-container.component.js'

class Signup extends React.Component {

	render(){
		console.log(this.props)
		const {signup, signupFormSubmitError, doSignupUser} = this.props
		return <SignupFormContainer
			onError={signupFormSubmitError}
			onSubmit={doSignupUser}
			signup={signup}
		/>
	}
}

const select = state => (
	{ signup: state.signup }
)

const actions = {
	signupFormSubmitError,
	doSignupUser
}

export default connect(select, actions)(Signup)