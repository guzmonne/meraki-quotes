import React from 'react'
import NavBar from './navbar.component.js'

export default class MainLayout extends React.Component {
	constructor(){
		super()
	}

	render(){
		return (
			<div className="outer">
				<NavBar></NavBar>
				{this.props.children}
			</div>
		)
	}
}