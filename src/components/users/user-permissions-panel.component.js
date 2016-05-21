import React from 'react'
import {
	Panel,
	ListGroup,
	ListGroupItem,
	Tooltip,
	OverlayTrigger,
} from 'react-bootstrap'

import IfElse from '../helpers/ifelse.component.js'
import Spinner from '../helpers/spinner.component.js'

const deleteTooltip = <Tooltip id="eliminar">Eliminar</Tooltip>

const UserPermissionsLoadingListGroup = () =>
	<ListGroup fill>
		<ListGroupItem>
			<div className="text-center">
				<Spinner />
			</div>
		</ListGroupItem>
	</ListGroup>

const UserPermissionsActiveListGroup = ({showDelete=true, permissions, onDelete}) =>
	<ListGroup fill>
		{permissions && permissions.map(permission => 
			<ListGroupItem key={permission}>
				{permission}
				<IfElse 
					ifComponent={	<OverlayTrigger placement="left" overlay={deleteTooltip}>
													<i 
														className="fa fa-times text-danger pull-right pointer"
														onClick={() => onDelete(permission)}
													></i>
												</OverlayTrigger> }
					elseComponent={<span></span>}
					test={showDelete}
				/>
			</ListGroupItem>
		)}
</ListGroup>
	

const UserPermissionsPanel = ({showDelete, loading, permissions, onDelete}) =>
	<Panel header="Permisos">
		<IfElse 
			ifComponent={<UserPermissionsLoadingListGroup />}
			elseComponent={<UserPermissionsActiveListGroup showDelete={showDelete} permissions={permissions} onDelete={onDelete} />}
			test={loading}
		/>
	</Panel>

UserPermissionsPanel.propTypes = {
	showDelete : React.PropTypes.bool,
	loading    : React.PropTypes.bool,
	permissions: React.PropTypes.array,
	onDelete   : React.PropTypes.func
}

UserPermissionsActiveListGroup.propTypes = {
	showDelete : React.PropTypes.bool,
	permissions: React.PropTypes.array,
	onDelete   : React.PropTypes.func
}

export default UserPermissionsPanel