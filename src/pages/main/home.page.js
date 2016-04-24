import React from 'react'
import {connect} from 'react-redux'
import {doMerakiQuotesCreate} from '../meraki_quotes/actions/meraki-quotes.actions.js'
import MerakiQuotesMenu from '../../components/menus/meraki-quotes-menu.component.js'
import UsersMenu from '../../components/menus/users-menu.component.js'

class HomePage extends React.Component {
	render(){
		const {doMerakiQuotesCreate} = this.props

		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-6">
						<MerakiQuotesMenu 
							onCreate={doMerakiQuotesCreate}
						/>
					</div>
					<div className="col-sm-6">
						<UsersMenu />
					</div>
				</div>
			</div>
		)
	}
}

const select = state => ({})

const actions = {
	doMerakiQuotesCreate
}

export default connect(select, actions)(HomePage)