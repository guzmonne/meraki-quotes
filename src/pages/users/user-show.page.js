import React from 'react'
import {connect} from 'react-redux'
import {
	doUserShow,
	userCurrentFree,
	userCurrentFunctionsEditableToggle,
	doUserPermissionsUpdate,
	doUserPermissionsIndex
} from './actions/users.actions.js'
import UserShowContainer from '../../components/users/user-show-container.component.js'

class UserShowPage extends React.Component {
	constructor(){
		super()
	}

	componentWillMount(){
		this.props.doUserShow(this.props.params.email)
	}

	componentWillUnmount(){
		this.props.userCurrentFree()
	}

	render(){
		const {
			users,
			doUserShow,
			userCurrentFunctionsEditableToggle,
			doUserPermissionsIndex,
			doUserPermissionsUpdate
		} = this.props
		return <UserShowContainer
			users={users}
			onToggle={userCurrentFunctionsEditableToggle}
			onIndexPermissions={doUserPermissionsIndex}
			onUserPermissionsUpdate={doUserPermissionsUpdate}
		/>
	}
}

const select = state => (
	{users: state.users}
)

const actions = {
	doUserShow,
	userCurrentFree,
	userCurrentFunctionsEditableToggle,
	doUserPermissionsIndex,
	doUserPermissionsUpdate
}

export default connect(select, actions)(UserShowPage)