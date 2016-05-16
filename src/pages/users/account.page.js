import React from 'react'
import {connect} from 'react-redux'
import AccountContainer from '../../components/users/account-container.component.js'

class AccountPage extends React.Component {
	render(){
		const {state} = this.props
		return <AccountContainer
			user={state.account}
		/>
	}
}

const select = state => (
	{state: state.users}
)

const actions = {}

export default connect(select, actions)(AccountPage)