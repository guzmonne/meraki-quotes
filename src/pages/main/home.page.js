import React from 'react'
import {Nav, NavItem, Panel} from 'react-bootstrap'

export default (props) => 
	<div className="container">
		<div className="row">
			<div className="col-sm-6">
				<h4>Meraki Quotes</h4>
			  <Panel>
				  <Nav bsStyle="pills" stacked>
				    <NavItem eventKey={1} href="/meraki_quotes/new">Nuevo Quote</NavItem>
				    <NavItem eventKey={2} href="/meraki_quotes/list">Mis Quotes</NavItem>
				    <NavItem eventKey={2} href="/meraki_quotes/list">Quotes Compartidos</NavItem>
				    <NavItem eventKey={3} href="/meraki_quotes/price_list">Lista de Precios</NavItem>
				  </Nav>
			  </Panel>
			</div>
		</div>
	</div>

function logout(){
	delete localStorage.token;
}