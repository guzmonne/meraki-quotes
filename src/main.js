import React from 'react'
// React-Router
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
// Redux
import {Provider} from 'react-redux'
import {store} from './state/store.js'
// Modules
import Auth from './modules/auth.module.js'
// Signup Page
import SignupPage from './pages/main/signup.page.js'
import LoginPage from './pages/main/login.page.js'
import HomePage from './pages/main/home.page.js'
// Main Layouts
import MainLayout from './components/layout/main.layout.js'
// Meraki Quotes
import MerakiQuotesLayout from './components/layout/meraki-quotes.layout.js'
import MerakiPriceListPage from './pages/meraki_quotes/meraki-price-list.page.js'
import MerakiQuotesIndex from './pages/meraki_quotes/meraki-quotes-index.page.js'
import MerakiQuotesEdit from './pages/meraki_quotes/meraki-quotes-edit.page.js'
// Users
import UserCreatePage from './pages/users/user-create.page.js'
import UserShowPage from './pages/users/user-show.page.js'
import UsersIndexPage from './pages/users/users-index.page.js'
import PermissionsPage from './pages/users/permissions.page.js'
// User
import UserProfileLayout from './components/layout/user-profile.layout.js'
import AccountPage from './pages/users/account.page.js'
import ChangePasswordPage from './pages/users/change-password.page.js'
import UserPermissionsPage from './pages/users/user-permissions.page.js'
import ActivateAccountPage from './pages/users/activate-account.page.js'

export default (props) => 
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={MainLayout} onEnter={requireAuth}>
				<IndexRoute component={HomePage} />
				<Route path="meraki_quotes" component={MerakiQuotesLayout}>
					<IndexRoute component={MerakiQuotesIndex} />
					<Route path="price_list" component={MerakiPriceListPage} />
					<Route path="index" onEnter={toMerakiQuotesListPage}/>
					<Route path="edit/:ID" component={MerakiQuotesEdit} />
				</Route>
				<Route path="users">
					<IndexRoute onEnter={toUsersListPage}/>
					<Route path="create" component={UserCreatePage}/>
					<Route path="index" component={UsersIndexPage}/>
					<Route path="permissions" component={PermissionsPage}/>
					<Route path="show/:email" component={UserShowPage} />
				</Route>
				<Route path="user" component={UserProfileLayout}>
					<Route path="account" component={AccountPage}/>
					<Route path="change_password" component={ChangePasswordPage}/>
					<Route path="permissions" component={UserPermissionsPage}/>
				</Route>
			</Route>
			<Route path="activate_account" component={ActivateAccountPage} />
			<Route path="login" component={LoginPage} onEnter={alreadyLoggedIn}/>
			<Route path="signup" component={SignupPage} />
		</Router>
	</Provider>

function replacePathnameWith(url, nextState, replace){
	replace({
		pathname: url,
		state: {nextPathname: nextState.location.pathname}
	})
}

function alreadyLoggedIn(...args){
	if (Auth.token()){
		replacePathnameWith('/', ...args)
	}
}

function requireAuth(...args){
	localStorage.log = JSON.stringify(Auth.token.hasExpired())
	if (Auth.token.hasExpired() === true){
		delete localStorage.token
		location.href = '/login'
	}	
}

function toMerakiQuotesListPage(...args){
	replacePathnameWith('/meraki_quotes', ...args)
}

function toUsersListPage(...args){
	replacePathnameWith('/users/index', ...args)
}
