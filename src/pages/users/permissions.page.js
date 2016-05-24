import React from 'react'
import {connect} from 'react-redux'
import {
	doHelpersUserPermissionsIndex,
	doHelpersUserPermissionsUpdate,
} from '../main/actions/helpers.actions.js'
import PermissionsContainer from '../../components/users/permissions-container.component.js'

class PermissionsPage extends React.Component {
	constructor(){
		super()
	}

	componentWillMount(){
		this.props.doHelpersUserPermissionsIndex()
	}

	render(){
		const {doHelpersUserPermissionsIndex, doHelpersUserPermissionsUpdate, state} = this.props
		return <PermissionsContainer
			onIndex={doHelpersUserPermissionsIndex}
			onUpdate={doHelpersUserPermissionsUpdate}
			permissions={state.userPermissions}
			loading={state.isFetchingUserPermissions}
		/>
	}
}

const select = state => (
	{state: state.helpers}
)

const actions = {
	doHelpersUserPermissionsIndex,
	doHelpersUserPermissionsUpdate,
}

export default connect(select, actions)(PermissionsPage)