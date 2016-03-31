import React from 'react'
import {connect} from 'react-redux'
import {doUsersIndex} from './actions/users.actions.js'
import UsersIndexContainer from '../../components/users/users-index-container.component.js'

class UsersIndexPage extends React.Component {
	constructor(){
		super()
	}

	componentDidMount(){
		this.props.doUsersIndex()
	}

	render(){
		const {doUsersIndex, users} = this.props
		return <UsersIndexContainer
			onFetch={doUsersIndex}
			users={users}
		/>
	}
}

const select = state => (
	{users: state.users}
)

const actions = {
	doUsersIndex
}

export default connect(select, actions)(UsersIndexPage)