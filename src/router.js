import React from 'react'
import Main from './pages/main.page.js'
import Login from './pages/login.page.js'

export default class MainApp extends React.Component {
	constructor(){
		super()
		this.getIdToken = this.getIdToken.bind(this)
	}

	componentWillMount(){
		this.lock = new Auth0Lock('LDRy7rJJOoV1sjZbwEg68F7xVDf8KLsh', 'conatel.auth0.com')
		this.setState({idToken: this.getIdToken()})
	}

	getIdToken(){
		let idToken = localStorage.getItem('userToken')
		let authHash = this.lock.parseHash(window.location.hash)
		if (!idToken && authHash){
			idToken = authHash.id_token
			localStorage.setItem('userToken', authHash.id_token)
		}
		if (authHash && authHash.error){
			console.log('Error signing in...', authHash)
			return null
		}
		return idToken
	}

	render(){
		console.log(this.state.idToken)
		return (
			<div className="container">
				<div className="col-md-6 col-offset-2">
					{!!this.state.idToken ? 
						<Main lock={this.lock} idToken={this.state.idToken}/> :
						<Login lock={this.lock}/>}
				</div>
			</div>		
		)
	}
}
