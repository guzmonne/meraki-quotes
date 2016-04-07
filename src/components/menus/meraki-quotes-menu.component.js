import React from 'react'
import {Nav, NavItem, Panel} from 'react-bootstrap'
import {browserHistory} from 'react-router'

export default (props) =>
	<div className="MerakiQuotesMenu">
		<h4>Meraki Quotes</h4>
	  <Panel>
		  <Nav bsStyle="pills" stacked>
		    <NavItem eventKey={1} onClick={() => browserHistory.push('/meraki_quotes/new')}>
		    	Nuevo Quote
	    	</NavItem>
		    <NavItem eventKey={2} onClick={() => browserHistory.push('/meraki_quotes/index')}>
		    	Mis Quotes
	    	</NavItem>
		    <NavItem eventKey={3} onClick={() => browserHistory.push('/meraki_quotes/shared')}>
		    	Quotes Compartidos
	    	</NavItem>
		    <NavItem eventKey={4} onClick={() => browserHistory.push('/meraki_quotes/price_list')}>
		    	Lista de Precios
	    	</NavItem>
		  </Nav>
	  </Panel>
	</div>