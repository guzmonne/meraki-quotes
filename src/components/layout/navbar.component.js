import React from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import {browserHistory} from 'react-router'

export default () =>
  <Navbar fluid={true}>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Conapps</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
	    <Nav>
	      <NavDropdown eventKey={1} title="Meraki Quotes" id="basic-nav-dropdown">
	        <MenuItem onClick={() => browserHistory.push('/meraki_quotes/new')} eventKey={2.1}>
	        	Nuevo Quote
        	</MenuItem>
	        <MenuItem onClick={() => browserHistory.push('/meraki_quotes/list')} eventKey={2.2}>
	        	Mis Quotes
        	</MenuItem>
	        <MenuItem onClick={() => browserHistory.push('/meraki_quotes/shared')} eventKey={2.3}>
	        	Quotes Compartidos
        	</MenuItem>
	        <MenuItem divider />
	        <MenuItem onClick={() => browserHistory.push('/meraki_quotes/price_list')} eventKey={2.4}>
	        	Lista de Precios
        	</MenuItem>
	      </NavDropdown>
	    </Nav>
	    <Nav pullRight>
	      <NavItem eventKey={3} href="/login" onClick={() => delete localStorage.token}>
	      	Cerrar Sesión
	      </NavItem>
	    </Nav>
    </Navbar.Collapse>
  </Navbar>