import React from 'react'
import {connect} from 'react-redux'
import {doMerakiQuotesCreate} from '../../pages/meraki_quotes/actions/meraki-quotes.actions.js'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import {browserHistory} from 'react-router'
import MerakiQuotesNav from '../meraki_quotes/meraki-quotes-nav.component.js'
import UsersNav from '../users/users-nav.component.js'
import AuthorizedContainer from '../helpers/authorized-container.component.js'

class NavBar extends React.Component {
  render(){
    const {doMerakiQuotesCreate, state} = this.props

    return (
      <Navbar fluid={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#" onClick={e => browserHistory.push('/')}>Conapps</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
        	<MerakiQuotesNav onCreate={doMerakiQuotesCreate}/>
          <AuthorizedContainer user={state.account} permission="users-admin">
        	 <UsersNav /> 
          </AuthorizedContainer>
    	    <Nav pullRight>
    	      <NavItem eventKey={3} href="/login" onClick={() => delete localStorage.token}>
    	      	Cerrar Sesión
    	      </NavItem>
    	    </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const select = state => ({
  state: state.users
})

const actions = {
  doMerakiQuotesCreate
}

export default connect(select, actions)(NavBar)