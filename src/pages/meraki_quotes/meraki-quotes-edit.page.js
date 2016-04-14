import React from 'react'
import {connect} from 'react-redux'
import {
	doMerakiQuotesGet,
	doMerakiQuoteUpdate
} from './actions/meraki-quotes.actions.js'
import MerakiQuotesEditContainer from '../../components/meraki_quotes/meraki-quotes-edit-container.component.js'

class MerakiQuotesEdit extends React.Component {
	componentWillMount(){
		this.props.doMerakiQuotesGet(this.props.params.ID)
	}

	componentWillUnmount(){
		this.props.doMerakiQuotesGet({reset: true})
	}

	render(){
		const {doMerakiQuotesGet, doMerakiQuoteUpdate, merakiQuotes} = this.props
		return <MerakiQuotesEditContainer
			onFetch={doMerakiQuotesGet}
			onUpdate={doMerakiQuoteUpdate}
			state={merakiQuotes}
			model={merakiQuotes.current}
		/>
	}
}

const select = state => (
	{merakiQuotes: state.merakiQuotes}
)

const actions = {
	doMerakiQuotesGet,
	doMerakiQuoteUpdate
}

export default connect(select, actions)(MerakiQuotesEdit)