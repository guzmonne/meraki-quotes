import React from 'react'
import {connect} from 'react-redux'
import {
	doMerakiQuoteGet,
	doMerakiQuoteUpdate
} from './actions/meraki-devices.actions.js'
import MerakiQuotesEditContainer from '../../components/meraki_quotes/meraki-quotes-edit-container.component.js'

class MerakiQuotesEdit extends React.Component {
	render(){
		const {doMerakiQuoteGet, doMerakiQuoteUpdate, merakiQuotes} = this.props
		return <MerakiQuotesEditContainer
			onFetch={doMerakiQuoteGet}
			onUpdate={doMerakiQuoteUpdate}
			state={merakiQuotes}
		/>
	}
}

const select = state => (
	{merakiQuotes: state.merakiQuotes}
)

const actions = {
	doMerakiQuoteGet,
	doMerakiQuoteUpdate
}

export default connect(select, actions)(MerakiQuotesEdit)