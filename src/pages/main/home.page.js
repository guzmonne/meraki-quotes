import React from 'react'
import MerakiQuotesMenu from '../../components/menus/meraki-quotes-menu.component.js'
import UsersMenu from '../../components/menus/users-menu.component.js'

export default (props) => 
	<div className="container">
		<div className="row">
			<div className="col-sm-6">
				<MerakiQuotesMenu />
			</div>
			<div className="col-sm-6">
				<UsersMenu />
			</div>
		</div>
	</div>