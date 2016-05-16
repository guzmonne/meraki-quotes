import React from 'react'
import {connect} from 'react-redux'
import UserPermissionsContainer from '../../components/users/user-permissions-container.component.js'

class UserPermissionsPage extends React.Component {
	render(){
		const {state} = this.props
		return <UserPermissionsContainer
			user={state.current}
		/>
	}
}

const select = state => (
	{state: state.users}
)

const actions = {}

export default connect(select, actions)(UserPermissionsPage)