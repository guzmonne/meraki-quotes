import React from 'react'
import UsersTable from './users-table.component.js'
import {Grid, Row, Col, Panel} from 'react-bootstrap'

export default ({users}) =>
	<Grid fluid className="UsersIndex">
		<Panel>
			<Row>
				<Col xs={12}>
					<h4>Usuarios</h4>
					<UsersTable updating={users.isFetchingUsers} collection={users.collection} />
				</Col>
			</Row>
		</Panel>
	</Grid>