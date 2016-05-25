import React from 'react'
import {connect} from 'react-redux'
import {doMerakiQuotesCreate} from '../meraki_quotes/actions/meraki-quotes.actions.js'
import HomeContainer from '../../components/main/home-container.component.js'

class HomePage extends React.Component {
	render(){
		const {doMerakiQuotesCreate, state} = this.props

		return (
			<HomeContainer 
				onMerakiQuoteCreate={doMerakiQuotesCreate}
				user={state.account}
			/>
		)
	}
}

const select = state => ({
	state: state.users
})

const actions = {
	doMerakiQuotesCreate
}

export default connect(select, actions)(HomePage)