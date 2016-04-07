import React from 'react'
import {connect} from 'react-redux'
import {doMerakiQuotesIndex, doMerakiQuotesCreate} from './actions/meraki-quotes.actions.js'
import MerakiQuotesIndexContainer from '../../components/meraki_quotes/meraki-quotes-index-container.component.js'

class MerakiQuotesIndexPage extends React.Component {
	render(){
		const {doMerakiQuotesIndex, doMerakiQuotesCreate, merakiQuotes} = this.props
		return <MerakiQuotesIndexContainer
			// Props
		/>
	}
}

const select = state => (
	{
		merakiQuotes: state.merakiQuotes,
		user        : state.users.active
	}
)

const actions = {
	doMerakiQuotesIndex, doMerakiQuotesCreate
}

export default connect(select, actions)(MerakiQuotesIndexPage)