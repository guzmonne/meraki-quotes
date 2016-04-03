import React from 'react'
import {connect} from 'react-redux';
import {
	merakiDevicesIndex,
	selectMerakiDevicesPriceList,
	doMerakiDevicesCreate,
	toggleMerakiDevicesCreateModal
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
			toggleMerakiDevicesCreateModal
		} = this.props

		return (
			<MerakiPriceListContainer 
				merakiDevices={merakiDevices}
				onUpdate={merakiDevicesIndex}
				onPriceListSelection={selectMerakiDevicesPriceList}
				onCreate={doMerakiDevicesCreate}
				toggleModal={toggleMerakiDevicesCreateModal}
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
	toggleMerakiDevicesCreateModal
}

export default connect(select, actions)(MerakiPriceList)