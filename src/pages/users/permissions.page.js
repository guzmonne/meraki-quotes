import React from 'react'
import {connect} from 'react-redux'
import {doUserPermissionsIndex, doUserPermissionsCreate} from './actions/users.actions.js'
import PermissionsContainer from '../../components/users/permissions-container.component.js'

class PermissionsPage extends React.Component {
	constructor(){
		super()
	}

	componentWillMount(){
		this.props.doUserPermissionsIndex()
	}

	render(){
		const {doUserPermissionsIndex, doUserPermissionsCreate, state} = this.props
		return <PermissionsContainer
			onUpdate={doUserPermissionsIndex}
			onCreate={doUserPermissionsCreate}
			permissions={state.permissions}
			loading={state.isFetchingUserPermissions}
		/>
	}
}

const select = state => (
	{state: state.users}
)

const actions = {
	doUserPermissionsIndex, doUserPermissionsCreate
}

export default connect(select, actions)(PermissionsPage)