import React from 'react'
import {
	Col,
	Panel,
	ListGroup,
	ListGroupItem,
} from 'react-bootstrap'

import SidePanel from '../helpers/side-panel.component.js'

const UserPermissionsContainer = ({updating, user}) => 
	<SidePanel>
		<Col xs={12}>
			<Panel header="Permisos">
				{!updating ? 
						<ListGroup fill>
							{user.permissions && user.permissions.map(permission => 
								<ListGroupItem key={permission}>
									{permission}
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
	</SidePanel>

UserPermissionsContainer.propTypes = {
	updating: React.PropTypes.bool,
	permissions: React.PropTypes.array
}

export default UserPermissionsContainer