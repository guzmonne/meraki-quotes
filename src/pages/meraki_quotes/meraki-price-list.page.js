import React from 'react'
import {connect} from 'react-redux';
import {merakiDevicesIndex} from './actions/meraki-devices.actions.js'
import MerakiPriceListContainer from '../../components/meraki_quotes/meraki-price-list-container.component.js'

class MerakiPriceList extends React.Component {
	componentWillMount(){
		this.props.merakiDevicesIndex()
	}

	render(){
		const {merakiDevices, merakiDevicesIndex} = this.props

		return (
			<MerakiPriceListContainer 
				merakiDevices={merakiDevices}
				onUpdate={merakiDevicesIndex}
			/>
		)
	}
}

const select = state => (
	{ merakiDevices: state.merakiDevices }
)

const actions = {
	merakiDevicesIndex
}

export default connect(select, actions)(MerakiPriceList)