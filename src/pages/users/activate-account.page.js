import React from 'react'
import {connect} from 'react-redux'
import {doUserVerification} from './actions/users.actions.js'
import ActivateAccountContainer from '../../components/users/activate-account-container.component.js'

class ActivateAccountPage extends React.Component {
	constructor(){
		super()
	}

	componentWillMount(){
		const {query} = this.props.location
		const {email, verify} = query
		if(!email || !verify) return
		this.props.doUserVerification(email, verify)
	}

	render(){
		const {doUserVerify, state} = this.props
		console.log(state.error)
		return <ActivateAccountContainer
			verifying={state.isVerifyingAccount}
			error={Object.keys(state.error).length > 1}
		/>
	}
}

const select = state => (
	{state: state.users}
)

const actions = {
	doUserVerification
}

export default connect(select, actions)(ActivateAccountPage)