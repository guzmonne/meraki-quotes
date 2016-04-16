import React from 'react'
import {connect} from 'react-redux'
import {
	toggleMerakiQuotesCreateModal,
	doMerakiQuotesGet,
	doMerakiQuotesUpdate,
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
		const {
			doMerakiQuotesGet,
			doMerakiQuotesUpdate,
			toggleMerakiQuotesCreateModal,
			merakiQuotes
		} = this.props
		
		return <MerakiQuotesEditContainer
			onFetch={doMerakiQuotesGet}
			onUpdate={doMerakiQuotesUpdate}
			state={merakiQuotes}
			model={merakiQuotes.current}
			toggleModal={toggleMerakiQuotesCreateModal}
		/>
	}
}

const select = state => (
	{merakiQuotes: state.merakiQuotes}
)

const actions = {
	toggleMerakiQuotesCreateModal,
	doMerakiQuotesGet,
	doMerakiQuotesUpdate
}

export default connect(select, actions)(MerakiQuotesEdit)