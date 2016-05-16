import React from 'react'
import {connect} from 'react-redux'
import ChangePasswordContainer from '../../components/users/change-password-container.component.js'

class ChangePasswordPage extends React.Component {
	render(){
		const {state} = this.props
		return <ChangePasswordContainer />
	}
}

const select = state => (
	{state: state.users}
)

const actions = {}

export default connect(select, actions)(ChangePasswordPage)