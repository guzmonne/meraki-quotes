import React from 'react'
import {connect} from 'react-redux'
import {
	doUserShow,
	userCurrentFree,
	userCurrentFunctionsEditableToggle
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
		const {doUserShow, users, userCurrentFunctionsEditableToggle} = this.props
		return <UserShowContainer
			users={users}
			onToggle={userCurrentFunctionsEditableToggle}
		/>
	}
}

const select = state => (
	{users: state.users}
)

const actions = {
	doUserShow,
	userCurrentFree,
	userCurrentFunctionsEditableToggle
}

export default connect(select, actions)(UserShowPage)