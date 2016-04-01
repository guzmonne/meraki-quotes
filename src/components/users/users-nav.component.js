import React from 'react'
import {Nav, NavDropdown, MenuItem} from 'react-bootstrap'
import {browserHistory} from 'react-router'

export default () =>
	<Nav>
    <NavDropdown eventKey={1} title="Usuarios" id="users-nav">
      <MenuItem onClick={() => browserHistory.push('/users/create')} eventKey={2.1}>
      	Nuevo Usuario
    	</MenuItem>
      <MenuItem onClick={() => browserHistory.push('/users/index')} eventKey={2.2}>
      	Usuarios
    	</MenuItem>
      <MenuItem divider />
      <MenuItem onClick={() => browserHistory.push('/users/permissions')} eventKey={2.3}>
        Permisos
      </MenuItem>
    </NavDropdown>
  </Nav>