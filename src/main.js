import React from 'react'
// React-Router
import {Router, Route, browserHistory} from 'react-router'
// Redux
import {Provider} from 'react-redux'
import {store} from './state/store.js'
// Signup Page
import Signup from './pages/main/signup.page.js'

export default (props) => 
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Signup} />
		</Router>
	</Provider>