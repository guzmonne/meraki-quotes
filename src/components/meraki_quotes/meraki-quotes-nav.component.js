import React from 'react'
import {Nav, NavDropdown, MenuItem} from 'react-bootstrap'
import {browserHistory} from 'react-router'

export default () =>
	<Nav>
    <NavDropdown eventKey={1} title="Meraki Quotes" id="meraki-quotes-dropdown">
      <MenuItem onClick={() => browserHistory.push('/meraki_quotes/new')} eventKey={2.1}>
      	Nuevo Quote
    	</MenuItem>
      <MenuItem onClick={() => browserHistory.push('/meraki_quotes/index')} eventKey={2.2}>
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