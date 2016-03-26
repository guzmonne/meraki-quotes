import React from 'react'
import {connect} from 'react-redux';
import {getMerakiDevices} from './actions/meraki-devices.actions.js'
import MerakiPriceListContainer from '../../components/meraki_quotes/meraki-price-list-container.component.js'

class MerakiPriceList extends React.Component {
	componentWillMount(){
		this.props.getMerakiDevices()
	}

	render(){
		return (
			<pre>{JSON.stringify(this.props.merakiDevices)}</pre>
		)
	}
}

const select = state => (
	{ merakiDevices: state.merakiDevices }
)

const actions = {
	getMerakiDevices
}

export default connect(select, actions)(MerakiPriceList)