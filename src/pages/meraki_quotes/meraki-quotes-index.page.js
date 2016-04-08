import React from 'react'
import {connect} from 'react-redux'
import {
	doMerakiQuotesIndex,
	doMerakiQuotesCreate,
	toggleMerakiQuotesCreateModal
} from './actions/meraki-quotes.actions.js'
import MerakiQuotesIndexContainer from '../../components/meraki_quotes/meraki-quotes-index-container.component.js'

class MerakiQuotesIndexPage extends React.Component {
	render(){
		const {
			merakiQuotes,
			doMerakiQuotesIndex,
			doMerakiQuotesCreate,
			toggleMerakiQuotesCreateModal
		} = this.props
		return <MerakiQuotesIndexContainer
			onCreate={doMerakiQuotesCreate}
			toggleModal={toggleMerakiQuotesCreateModal}
			state={merakiQuotes}
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
	doMerakiQuotesIndex,
	doMerakiQuotesCreate,
	toggleMerakiQuotesCreateModal
}

export default connect(select, actions)(MerakiQuotesIndexPage)