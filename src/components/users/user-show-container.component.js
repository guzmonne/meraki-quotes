import React from 'react'
import PermissionsForm from './permissions-form.component.js'
import {
	Grid,
	Col,
	Row, 
	Panel,
	ListGroup,
	ListGroupItem,
	Tooltip,
	OverlayTrigger
} from 'react-bootstrap'
import Spinner from '../helpers/spinner.component.js'

const deleteTooltip = <Tooltip id="eliminar">Eliminar</Tooltip>

export default ({users, onToggle, onIndexPermissions, onUserPermissionsUpdate}) => 
	<Grid className="UserShow">
		<Row>
			<Col md={6} mdOffset={3}>
				{!users.isFetchingUser ? 
					<div className="UserShow__header">
						<h2>
							{users.current.username}
							<br/>
							<small>{users.current.email}</small>
						</h2>
						{!users.areCurrentFunctionsEditable}
						<button 
							className="btn-warning"
							onClick={() => {
								onToggle()
								if (users.permissions.length === 0)
									onIndexPermissions()
							}}
						>
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
				{typeof users.error === 'string' ? 
					<Panel header={<h3>¡Error!</h3>} bsStyle="primary">
						{users.error}
					</Panel>
					:
					null
				}
				<Panel collapsible expanded={!!users.areCurrentFunctionsEditable}>
					<PermissionsForm 
						onSubmit={onUserPermissionsUpdate}
						currentPermissions={users.current.permissions || []}
						permissions={users.permissions || []} />
				</Panel>
				<Panel header="Permisos">
					{!users.isFetchingUser ? 
							<ListGroup fill>
								{users.current.permissions && users.current.permissions.map(permission => 
									<ListGroupItem key={permission}>
										{permission}
										<OverlayTrigger placement="left" overlay={deleteTooltip}>
											<i 
												className="fa fa-times text-danger pull-right pointer"
												onClick={() => onUserPermissionsUpdate(permission)}
											></i>
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

			</Col>
		</Row>
	</Grid>