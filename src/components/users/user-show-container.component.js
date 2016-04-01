import React from 'react'
import PermissionsForm from './permissions-form.component.js'
import {Panel, ListGroup, ListGroupItem, Tooltip, OverlayTrigger} from 'react-bootstrap'
import Spinner from '../helpers/spinner.component.js'

const deleteTooltip = <Tooltip id="eliminar">Eliminar</Tooltip>

export default ({users, onToggle}) => 
	<div className="row UserShow">
		<div className="col-md-offset-3 col-md-6">
			{!users.isFetchingUser ? 
				<div className="UserShow__header">
					<h2>
						{users.current.username}
						<br/>
						<small>{users.current.email}</small>
					</h2>
					{!users.areCurrentFunctionsEditable}
					<button className="btn-warning" onClick={onToggle}>
						<i className="fa fa-pencil"></i>
						{' '}Editar Permisos
					</button>
				</div>
				:
				<div className="UserShow__header">
					<h2>
						Cargando...
						<br/>
						<small>
							<Spinner />
						</small>
					</h2>
				</div>
			}
			<Panel collapsible expanded={!!users.areCurrentFunctionsEditable}>
				<PermissionsForm permissions={users.current.functions || []} />
			</Panel>
			<Panel header="Permisos">
				{!users.isFetchingUser ? 
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
					:
					<ListGroup fill>
						<ListGroupItem>
							<div className="text-center">
								<Spinner />
							</div>
						</ListGroupItem>
					</ListGroup>
				}
			</Panel>
		</div>
	</div>