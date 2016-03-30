import React from 'react'
// React-Router
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
// Redux
import {Provider} from 'react-redux'
import {store} from './state/store.js'
// Signup Page
import SignupPage from './pages/main/signup.page.js'
import LoginPage from './pages/main/login.page.js'
import HomePage from './pages/main/home.page.js'
import MainLayout from './components/layout/main.layout.js'
// Meraki Quotes
import MerakiPriceListPage from './pages/meraki_quotes/meraki-price-list.page.js'
// Users
import UserCreatePage from './pages/users/user-create.page.js'

export default (props) => 
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={MainLayout} onEnter={requireAuth}>
				<IndexRoute component={HomePage} />
				<Route path="meraki_quotes">
					<IndexRoute onEnter={toMerakiQuotesListPage} />
					<Route path="price_list" component={MerakiPriceListPage} />
				</Route>
				<Route path="users">
					<IndexRoute onEnter={toUsersListPage}/>
					<Route path="create" component={UserCreatePage}/>
				</Route>
			</Route>
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
	if (!!localStorage.token){
		replacePathnameWith('/', ...args)
	}
}

function requireAuth(...args){
	if (!localStorage.token){
		replacePathnameWith('/login', ...args)
	}	
}

function toMerakiQuotesListPage(...args){
	replacePathnameWith('/meraki_quotes/list', ...args)
}

function toUsersListPage(...args){
	replacePathnameWith('/users/list', ...args)
}
