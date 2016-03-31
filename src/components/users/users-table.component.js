import React from 'react'
import {Table, Glyphicon} from 'react-bootstrap'

export default (props) =>
	<Table responsive bordered hover>
		<thead>
			<tr>
				<th>Nombre</th>
				<th>Email</th>
				<th><i className="fa fa-ellipsis-h"></i></th>
			</tr>
		</thead>
		<tbody>
			{props.collection.map((user, i) =>
				<tr key={i}>
					<td>{user.username}</td>
					<td>{user.email}</td>
					<td>
						<a href="javascript:void(0);">Ver permisos</a>
					</td>
				</tr>)}
		</tbody>
	</Table>	