import React from 'react'
import {connect} from 'react-redux'
import {doUserShow} from './actions/users.actions.js'
import UserShowContainer from '../../components/users/user-show-container.component.js'

class UserShowPage extends React.Component {
	constructor(){
		super()
	}

	componentWillMount(){
		this.props.doUserShow(this.props.params.email)
	}

	render(){
		const {doUserShow, users} = this.props
		return <UserShowContainer
			users={users}
		/>
	}
}

const select = state => (
	{users: state.users}
)

const actions = {
	doUserShow
}

export default connect(select, actions)(UserShowPage)