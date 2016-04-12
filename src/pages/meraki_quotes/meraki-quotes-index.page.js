import React from 'react'
import {connect} from 'react-redux'
import {
	doMerakiQuotesIndex,
	doMerakiQuotesCreate,
	toggleMerakiQuotesCreateModal,
	setMerakiQuotesPageSize,
	setMerakiQuotesQueryString
} from './actions/meraki-quotes.actions.js'
import MerakiQuotesIndexContainer from '../../components/meraki_quotes/meraki-quotes-index-container.component.js'

class MerakiQuotesIndexPage extends React.Component {
	componentWillMount(){
		this.props.doMerakiQuotesIndex(0)
	}

	render(){
		const {
			merakiQuotes,
			doMerakiQuotesIndex,
			doMerakiQuotesCreate,
			toggleMerakiQuotesCreateModal,
			setMerakiQuotesPageSize,
			setMerakiQuotesQueryString
		} = this.props
		return <MerakiQuotesIndexContainer
			onCreate={doMerakiQuotesCreate}
			onUpdate={doMerakiQuotesIndex}
			toggleModal={toggleMerakiQuotesCreateModal}
			state={merakiQuotes}
			setPageSize={setMerakiQuotesPageSize}
			setQueryString={setMerakiQuotesQueryString}
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
	toggleMerakiQuotesCreateModal,
	setMerakiQuotesPageSize,
	setMerakiQuotesQueryString
}

export default connect(select, actions)(MerakiQuotesIndexPage)