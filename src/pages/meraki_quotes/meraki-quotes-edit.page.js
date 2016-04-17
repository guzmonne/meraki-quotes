import React from 'react'
import {connect} from 'react-redux'
import {
	toggleMerakiQuotesCreateModal,
	doMerakiQuotesGet,
	doMerakiQuotesUpdate,
} from './actions/meraki-quotes.actions.js'
import {doMerakiDevicesGetAll} from './actions/meraki-devices.actions.js'
import MerakiQuotesEditContainer from '../../components/meraki_quotes/meraki-quotes-edit-container.component.js'

class MerakiQuotesEdit extends React.Component {
	componentWillMount(){
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
			merakiQuotes,
			merakiDevices
		} = this.props
		
		return <MerakiQuotesEditContainer
			onFetch={doMerakiQuotesGet}
			onUpdate={doMerakiQuotesUpdate}
			state={merakiQuotes}
			model={merakiQuotes.current}
			toggleModal={toggleMerakiQuotesCreateModal}
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
	doMerakiQuotesGet,
	doMerakiQuotesUpdate,
	doMerakiDevicesGetAll
}

export default connect(select, actions)(MerakiQuotesEdit)