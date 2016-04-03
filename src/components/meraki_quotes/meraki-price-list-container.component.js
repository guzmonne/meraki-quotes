import React from 'react'
import {
	Grid,
	Row,
	Col,
	Panel,
	ButtonToolbar,
	ButtonGroup,
	Button,
	Modal,
	Input
} from 'react-bootstrap'
import MerakiDevicesTable from './meraki-devices-table.component.js'
import Refresher from '../helpers/refresher.component.js'
import RefreshButton from '../helpers/refresh-button.component.js'
import PriceListDropdown from './price-list-dropdown.component.js'
import MerakiDeviceCreateModal from './meraki-device-create-modal.component.js'

export default ({merakiDevices, onUpdate, onPriceListSelection, toggleModal, onCreate}) =>
	<Grid fluid className="MerakiPriceList">
		<Panel>
			<Row>
				<Col xs={12}>
					<h4>Meraki - Lista de Precios</h4>
				</Col>
			</Row>
			<Row>
				<Col xs={6}>
					<ButtonToolbar>
						<ButtonGroup>
							<RefreshButton 
								onClick={onUpdate}
								refreshing={merakiDevices.isGettingMerakiDevices}
							/>
						</ButtonGroup>
						<ButtonGroup>
							<Button onClick={toggleModal}>
								<i className="fa fa-plus"></i>
								{' Nuevo'}
							</Button>
						</ButtonGroup>
					</ButtonToolbar>
				</Col>
				<Col xs={6}>
					<span className="pull-right">
				    <PriceListDropdown 
				    	discount={merakiDevices.priceListDiscount}
				    	selectAction={onPriceListSelection}
				    />
					</span>
				</Col>
			</Row>
			<Row>
				<Col xs={12}>
					<MerakiDevicesTable
						discount={merakiDevices.priceListDiscount}
						updating={merakiDevices.isGettingMerakiDevices} 
						collection={merakiDevices.collection} />
				</Col>
			</Row>
		</Panel>
		{/*MODAL*/}

		<MerakiDeviceCreateModal 
			onShow={merakiDevices.isShowingMerakiDeviceCreateModal}
			onToggle={toggleModal}
			onSubmit={onCreate}
		/>

	</Grid>