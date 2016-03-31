import React from 'react'
import UsersTable from './users-table.component.js'

export default ({users}) =>
	<div className="row UsersIndex">
		<div className="col-xs-12">
			<h4>Usuarios</h4>
			<UsersTable collection={users.collection} />
		</div>
	</div>