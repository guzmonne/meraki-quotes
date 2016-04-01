import React from 'react'
import {Table, Glyphicon} from 'react-bootstrap'
import {browserHistory} from 'react-router'
import Spinner from '../helpers/spinner.component.js'

export default ({updating, collection}) =>
	<Table responsive bordered hover>
		<thead>
			<tr>
				<th>Nombre</th>
				<th>Email</th>
				<th><i className="fa fa-ellipsis-h"></i></th>
			</tr>
		</thead>
		{collection.length === 0 && updating ? 
			<tbody>
				<tr>
					<td colSpan="3" className="text-center">
						<Spinner />
					</td>
				</tr>
			</tbody>
			:
			<tbody>
				{collection.map((user, i) =>
					<tr key={i}>
						<td>{user.username}</td>
						<td>{user.email}</td>
						<td>
							<a 
								onClick={() => browserHistory.push(`/users/show/${btoa(user.email)}`)}
								href="javascript:void(0);">
								Ver permisos
							</a>
						</td>
					</tr>)}
			</tbody>
		}
	</Table>	