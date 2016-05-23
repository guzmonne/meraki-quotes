import React from 'react'

const labelFromMethod = method => {
	switch(method){
		case 'GET'   : return 'label label-info'
		case 'POST'  : return 'label label-success'
		case 'DELETE': return 'label label-danger'
		case 'PUT'   : return 'label label-warning'
		default:       return 'label label-default'
	}
}

const UserPermissionsTable = ({permissions=[]}) => 
	<table className="table">
		<tbody>
			{permissions.map((p, i) =>
				<tr key={i}>
					<td><span className={labelFromMethod(p.method)}>{p.method}</span></td>
					<td><span className="text-primary">{p.url}</span></td>
					<td>{p.permission}</td>
				</tr>
			)}
		</tbody>
	</table>

UserPermissionsTable.propTypes = {
	permissions: React.PropTypes.array.isRequired
}

export default UserPermissionsTable