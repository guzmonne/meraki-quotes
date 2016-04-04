import React from 'react'
import {connect} from 'react-redux';
import {
	merakiDevicesIndex,
	selectMerakiDevicesPriceList,
	doMerakiDevicesCreate,
	toggleMerakiDevicesCreateModal,
	doSetCurrentMerakiDevice,
	doSelectMerakiDevice
} from './actions/meraki-devices.actions.js'
import MerakiPriceListContainer from '../../components/meraki_quotes/meraki-price-list-container.component.js'

class MerakiPriceList extends React.Component {
	componentWillMount(){
		this.props.merakiDevicesIndex()
	}

	render(){
		const {
			merakiDevices, 
			merakiDevicesIndex,
			selectMerakiDevicesPriceList,
			doMerakiDevicesCreate,
			toggleMerakiDevicesCreateModal,
			doSetCurrentMerakiDevice,
			doSelectMerakiDevice
		} = this.props

		return (
			<MerakiPriceListContainer 
				merakiDevices={merakiDevices}
				onUpdate={merakiDevicesIndex}
				onPriceListSelection={selectMerakiDevicesPriceList}
				onCreate={doMerakiDevicesCreate}
				toggleModal={toggleMerakiDevicesCreateModal}
				setFormDevice={doSetCurrentMerakiDevice}
				onSelect={doSelectMerakiDevice}
			/>
		)
	}
}

const select = state => (
	{ merakiDevices: state.merakiDevices }
)

const actions = {
	merakiDevicesIndex,
	selectMerakiDevicesPriceList,
	doMerakiDevicesCreate,
	toggleMerakiDevicesCreateModal,
	doSetCurrentMerakiDevice,
	doSelectMerakiDevice
}

export default connect(select, actions)(MerakiPriceList)