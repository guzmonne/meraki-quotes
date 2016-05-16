import React from 'react'
import {connect} from 'react-redux'
import NavBar from './navbar.component.js'
import SpinnerModal from '../helpers/spinner-modal.component.js'
import {getActiveUser} from '../../pages/users/actions/users.actions.js'

class MainLayout extends React.Component {
	constructor(){
		super()
	}

	componentWillMount(){
		this.props.getActiveUser()
	}

	render(){
		const {loading} = this.props.main

		return (
			<div className="outer">
				<SpinnerModal loading={loading} />
				<NavBar/>
				{this.props.children}
			</div>
		)
	}
}

const select = state => (
	{main: state.main}
)

const actions = {
	getActiveUser
}

export default connect(select, actions)(MainLayout)