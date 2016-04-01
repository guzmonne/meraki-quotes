import React from 'react'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import {browserHistory} from 'react-router'
import MerakiQuotesNav from '../meraki_quotes/meraki-quotes-nav.component.js'
import UsersNav from '../users/users-nav.component.js'

export default () =>
  <Navbar fluid={true}>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#" onClick={e => browserHistory.push('/')}>Conapps</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
    	<MerakiQuotesNav />
    	<UsersNav />
	    <Nav pullRight>
	      <NavItem eventKey={3} href="/login" onClick={() => delete localStorage.token}>
	      	Cerrar Sesión
	      </NavItem>
	    </Nav>
    </Navbar.Collapse>
  </Navbar>