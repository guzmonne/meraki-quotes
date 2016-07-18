import React from 'react'
import {connect} from 'react-redux'
import {
	toggleMerakiQuotesCreateModal,
	toggleSelectionOnMerakiDevices,
	doMerakiQuotesGet,
	doMerakiQuotesUpdate,
	toggleMerakiQuotesEditLog,
	toggleMerakiQuotesEdiLog
} from './actions/meraki-quotes.actions.js'
import {doMerakiDevicesGetAll} from './actions/meraki-devices.actions.js'
import MerakiQuotesEditContainer from '../../components/meraki_quotes/meraki-quotes-edit-container.component.js'

class MerakiQuotesEdit extends React.Component {
	componentWillMount(){
		if (this.props.merakiQuotes.current.ID !== this.props.params.ID)
			this.props.doMerakiQuotesGet(this.props.params.ID)
		if (this.props.merakiDevices.all.length === 0)
			this.props.doMerakiDevicesGetAll()
	}

	componentWillUnmount(){
		this.props.doMerakiQuotesGet({reset: true})
	}

	render(){
		const {
			doMerakiQuotesGet,
			doMerakiQuotesUpdate,
			doMerakiDevicesGetAll,
			toggleMerakiQuotesCreateModal,
			toggleSelectionOnMerakiDevices,
			toggleMerakiQuotesEditCharts,
			toggleMerakiQuotesEditLog,
			merakiQuotes,
			merakiDevices
		} = this.props
		
		return <MerakiQuotesEditContainer
			onFetch={doMerakiQuotesGet}
			onUpdate={doMerakiQuotesUpdate}
			onSelect={toggleSelectionOnMerakiDevices}
			state={merakiQuotes}
			model={merakiQuotes.current}
			toggleCreateModal={toggleMerakiQuotesCreateModal}
			toggleLog={toggleMerakiQuotesEditLog}
			devices={merakiDevices.all}
			isGettingMerakiDevices={merakiDevices.isGettingMerakiDevices}
		/>
	}
}

const select = state => (
	{
		merakiQuotes: state.merakiQuotes,
		merakiDevices: state.merakiDevices
	}
)

const actions = {
	toggleMerakiQuotesCreateModal,
	toggleSelectionOnMerakiDevices,
	toggleMerakiQuotesEditLog,
	doMerakiQuotesGet,
	doMerakiQuotesUpdate,
	doMerakiDevicesGetAll
}

export default connect(select, actions)(MerakiQuotesEdit)