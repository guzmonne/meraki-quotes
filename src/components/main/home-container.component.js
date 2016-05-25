import React from 'react'
import MerakiQuotesMenu from '..//menus/meraki-quotes-menu.component.js'
import UsersMenu from '../menus/users-menu.component.js'
import UserProfileMenu from '../menus/user-profile-menu.component.js'
import AuthorizedContainer from '../helpers/authorized-container.component.js'

export default ({onMerakiQuoteCreate, user}) => 
	<div className="container">
		<div className="row">
			<div className="col-sm-6" style={{height: '244px'}}>
				<MerakiQuotesMenu 
					onCreate={onMerakiQuoteCreate}
				/>
			</div>
			<div className="col-sm-6" style={{height: '244px'}}>
				<UserProfileMenu />
			</div>
			<AuthorizedContainer user={user} permission="users-admin">
				<div className="col-sm-6" style={{height: '244px'}}>
					<UsersMenu />
				</div>
			</AuthorizedContainer>
		</div>
	</div>