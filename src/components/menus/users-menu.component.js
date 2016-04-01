import React from 'react'
import {Nav, NavItem, Panel} from 'react-bootstrap'
import {browserHistory} from 'react-router'

export default (props) =>
	<div className="UsersMenu">
		<h4>Administración de Usuarios</h4>
	  <Panel>
		  <Nav bsStyle="pills" stacked>
		    <NavItem eventKey={1} onClick={() => browserHistory.push('/users/create')}>
		    	Nuevo Usuario
	    	</NavItem>
		    <NavItem eventKey={2} onClick={() => browserHistory.push('/users/index')}>
		    	Usuarios
	    	</NavItem>
		    <NavItem eventKey={3} onClick={() => browserHistory.push('/users/permissions')}>
		    	Permisos
	    	</NavItem>
		  </Nav>
	  </Panel>
	</div>