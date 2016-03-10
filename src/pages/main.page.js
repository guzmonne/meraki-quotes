import React from 'react'
import {Logs} from '../modules/firebase.module.js'

export default class Main extends React.Component {
	constructor(){
		super()
		this.state = {profile: null}
		Logs.all();
	}

	componentDidMount(){
		this.props.lock.getProfile(this.props.idToken, (err, profile) => {
			if (err)
				return console.log('Error loading the profile', err);
			this.setState({profile: profile})
		})
	}

	render(){
		if (this.state.profile)
			return <h2>Welcome {this.state.profile.nickname}</h2>
		else
			return <div className="loading">Loading profile</div>
	}
}