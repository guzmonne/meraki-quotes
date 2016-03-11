import React from 'react'
import {Logs, Session} from '../modules/firebase.module.js'

export default class Main extends React.Component {
	constructor(){
		super()
		this.logout = this.logout.bind(this)
		this.state = {profile: null}
	}

	logout(){
		localStorage.removeItem('userToken');
		Session.logout()
		window.location = `https://conatel.auth0.com/v2/logout?returnTo=${encodeURIComponent('http://localhost:3000/')}`
	}

	componentDidMount(){
		this.props.lock.getProfile(this.props.idToken, (err, profile) => {
			if (err) {
				console.log('Error loading the profile', err);
				return this.logout();
			}
			this.setState({profile: profile})
		})
		Logs.all().
			take(2).
			subscribe(data => console.log(data.snapshot.val()));
	}

	render(){
		if (this.state.profile)
			return (
				<div>
					<h2>Welcome {this.state.profile.nickname}</h2>
					<a 
						onClick={this.logout}
						className="btn btn-danger">
						Logout
					</a>
				</div>
			)
		else
			return <div className="loading">Loading profile</div>
	}
}