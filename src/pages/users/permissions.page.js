import React from 'react'
import {connect} from 'react-redux'
import {doUserPermissionsIndex, doUserPermissionsCreate} from './actions/users.actions.js'
import {doHelpersUserPermissionsIndex} from '../main/actions/helpers.actions.js'
import PermissionsContainer from '../../components/users/permissions-container.component.js'

class PermissionsPage extends React.Component {
	constructor(){
		super()
	}

	componentWillMount(){
		this.props.doHelpersUserPermissionsIndex()
	}

	render(){
		const {doUserPermissionsIndex, doUserPermissionsCreate, state} = this.props
		return <PermissionsContainer
			onUpdate={doHelpersUserPermissionsIndex}
			onCreate={doUserPermissionsCreate}
			permissions={state.userPermissions}
			loading={state.isFetchingUserPermissions}
		/>
	}
}

const select = state => (
	{state: state.helpers}
)

const actions = {
	doUserPermissionsIndex, doUserPermissionsCreate, doHelpersUserPermissionsIndex
}

export default connect(select, actions)(PermissionsPage)