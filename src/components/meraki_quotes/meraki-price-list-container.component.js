import React from 'react'
import {Grid, Row, Col, Panel} from 'react-bootstrap'
import MerakiDevicesTable from './meraki-devices-table.component.js'


export default ({merakiDevices}) =>
	<Row className="MerakiPriceList">
		<Col xs={12}>
			<Panel>
				<h4>Meraki - Lista de Precios</h4>
				<MerakiDevicesTable
					updating={merakiDevices.isGettingMerakiDevices} 
					collection={merakiDevices.collection} />
			</Panel>
		</Col>
	</Row>