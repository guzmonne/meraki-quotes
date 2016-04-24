import React from 'react'
import {Nav, NavItem, Panel} from 'react-bootstrap'
import {browserHistory} from 'react-router'
import {randomQuote} from '../../modules/meraki-quotes.module.js'

const MerakiQuotesMenu = ({onCreate}) =>
	<div className="MerakiQuotesMenu">
		<h4>Meraki Quotes</h4>
	  <Panel>
		  <Nav bsStyle="pills" stacked>
		    <NavItem eventKey={1} onClick={() => {
		    	onCreate(randomQuote())
		    }} href="javascript:void(0);">
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

MerakiQuotesMenu.propTypes = {
	onCreate: React.PropTypes.func
}

export default MerakiQuotesMenu