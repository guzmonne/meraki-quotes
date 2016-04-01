import React from 'react'
import PermissionsForm from './permissions-form.component.js'
import {Panel, ListGroup, ListGroupItem, Tooltip, OverlayTrigger} from 'react-bootstrap'

const deleteTooltip = <Tooltip>Eliminar</Tooltip>

export default ({users}) => 
	<div className="row UserShow">
		<div className="col-md-offset-3 col-md-6">
			<h2>
				{users.current.username}
				<br/>
				<small>{users.current.email}</small>
			</h2>
			<PermissionsForm permissions={users.current.functions || []} />
			<Panel header="Permisos">
				<ListGroup fill>
					{users.current.functions && users.current.functions.map(permission => 
						<ListGroupItem key={permission}>
							{permission}
							<OverlayTrigger placement="right" overlay={deleteTooltip}>
								<i className="fa fa-times text-danger pull-right pointer"></i>
							</OverlayTrigger>
						</ListGroupItem>
					)}
				</ListGroup>
			</Panel>
		</div>
	</div>