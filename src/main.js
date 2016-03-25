import React from 'react'
// React-Router
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
// Redux
import {Provider} from 'react-redux'
import {store} from './state/store.js'
// Signup Page
import Signup from './pages/main/signup.page.js'
import Login from './pages/main/login.page.js'
import Home from './pages/main/home.page.js'
import MainLayout from './components/layout/main.layout.js'
// Meraki Quotes
import MerakiPriceList from './pages/meraki_quotes/meraki-price-list.page.js'

export default (props) => 
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={MainLayout} onEnter={requireAuth}>
				<IndexRoute component={Home} />
				<Route path="/meraki_quotes" onEnter={toHome} />
				<Route path="/meraki_quotes/price_list" component={MerakiPriceList} />
			</Route>
			<Route path="/login" component={Login} onEnter={alreadyLoggedIn}/>
			<Route path="/signup" component={Signup} />
		</Router>
	</Provider>

function alreadyLoggedIn(nextState, replace){
	if (!!localStorage.token){
		replace({
			pathname: '/',
			state: {nextPathname: nextState.location.pathname}
		})
	}
}

function requireAuth(nextState, replace){
	if (!localStorage.token){
		replace({
			pathname: '/login',
			state: {nextPathname: nextState.location.pathname}
		})
	}	
}

function toHome(nextState, replace){
	replace({
		pathname: '/meraki_quotes/list',
		state: {nextPathname: nextState.location.pathname}
	})
}