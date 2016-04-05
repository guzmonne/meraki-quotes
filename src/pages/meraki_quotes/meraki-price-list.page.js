import React from 'react'
import {connect} from 'react-redux';
import {
	merakiDevicesIndex,
	selectMerakiDevicesPriceList,
	doMerakiDevicesCreate,
	toggleMerakiDevicesCreateModal,
	doSetCurrentMerakiDevice,
	doSelectMerakiDevice,
	doMerakiDevicesDestroy,
	setMerakiDevicesPaginationKey
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
			doSelectMerakiDevice,
			doMerakiDevicesDestroy,
			setMerakiDevicesPaginationKey
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
				onDelete={doMerakiDevicesDestroy}
				setPaginationKey={setMerakiDevicesPaginationKey}
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
	doSelectMerakiDevice,
	doMerakiDevicesDestroy,
	setMerakiDevicesPaginationKey
}

export default connect(select, actions)(MerakiPriceList)