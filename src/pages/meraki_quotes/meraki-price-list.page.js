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
	setMerakiDevicesPageSize,
	setMerakiDevicesQueryString
} from './actions/meraki-devices.actions.js'
import MerakiPriceListContainer from '../../components/meraki_quotes/meraki-price-list-container.component.js'

class MerakiPriceList extends React.Component {
	componentWillMount(){
		this.props.merakiDevicesIndex(0)
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
			setMerakiDevicesPageSize,
			setMerakiDevicesQueryString
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
				setPageSize={setMerakiDevicesPageSize}
				setQueryString={setMerakiDevicesQueryString}
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
	setMerakiDevicesPageSize,
	setMerakiDevicesQueryString
}

export default connect(select, actions)(MerakiPriceList)