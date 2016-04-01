import React from 'react'
import UsersTable from './users-table.component.js'
import {Panel} from 'react-bootstrap'

export default ({users}) =>
	<div className="row UsersIndex">
		<div className="col-xs-12">
			<Panel>
				<h4>Usuarios</h4>
				<UsersTable updating={users.isFetchingUsers} collection={users.collection} />
			</Panel>
		</div>
	</div>