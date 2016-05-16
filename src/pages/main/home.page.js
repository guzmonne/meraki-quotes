import React from 'react'
import {connect} from 'react-redux'
import {doMerakiQuotesCreate} from '../meraki_quotes/actions/meraki-quotes.actions.js'
import HomePageContainer from '../../components/main/home-container.component.js'

class HomePage extends React.Component {
	render(){
		const {doMerakiQuotesCreate} = this.props

		return (
			<HomePageContainer 
				onMerakiQuoteCreate={doMerakiQuotesCreate}
			/>
		)
	}
}

const select = state => ({})

const actions = {
	doMerakiQuotesCreate
}

export default connect(select, actions)(HomePage)