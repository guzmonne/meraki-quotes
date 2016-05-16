import React from 'react'
import MerakiQuotesMenu from '..//menus/meraki-quotes-menu.component.js'
import UsersMenu from '../menus/users-menu.component.js'
import UserProfileMenu from '../menus/user-profile-menu.component.js'


export default ({onMerakiQuoteCreate}) => 
	<div className="container">
		<div className="row">
			<div className="col-sm-6">
				<MerakiQuotesMenu 
					onCreate={onMerakiQuoteCreate}
				/>
			</div>
			<div className="col-sm-6">
				<UsersMenu />
			</div>
		</div>
		<div className="row">
			<div className="col-sm-6">
				<UserProfileMenu />
			</div>
		</div>
	</div>