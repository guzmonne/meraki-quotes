import React from 'react'
import {
	Row,
	Col,
	Panel,
	Input,
	Button
} from 'react-bootstrap'
import MerakiQuotesMenu from '../menus/meraki-quotes-menu.component.js'
import MerakiQuotesBreadcrumbs from './meraki-quotes-breadcrumbs.component.js'
import MerakiQuotesDevicesTable from './meraki-quotes-devices-table.component.js'
import MerakiQuotesEditVariablesForm from './meraki-quotes-edit-variables-form.component.js'
import MerakiQuotesEditTotals from './meraki-quotes-edit-totals.component.js'
import MerakiQuotesDeviceSearchForm from './meraki-quotes-device-search-form.component.js'
import MerakiQuotesEditHeader from './meraki-quotes-edit-header.component.js'
import MerakiQuotesEditSettings from './meraki-quotes-edit-settings.component.js'
import MerakiQUotesCreateModal from './meraki-quote-create-modal.component.js'

export default ({
	children,
	state,
	onUpdate,
	onSelect,
	onFetch,
	page="index",
	toggleModal,
	model={},
	devices=[],
	isGettingMerakiDevices=false,
	// TODO: Remove this line for the actual current user implementation
	user={}
}) =>
	<Panel className="MerakiQuotesEdit">
		<MerakiQuotesEditHeader toggleModal={toggleModal} model={model} user={user}/>
		
		<MerakiQuotesDeviceSearchForm
			devices={devices}
			updating={isGettingMerakiDevices} 
			onAdd={device => onUpdate({Devices: [...(model.Devices || []), device]})}
		/>

		<MerakiQuotesEditSettings model={model} onUpdate={onUpdate} onRemoveDevice={() => {
			onUpdate({Devices: [...model.Devices.filter(device => device.selected !== true)]})
		}}/>

		<Row>
			<Col xs={12}>
				<MerakiQuotesDevicesTable 
					collection={model.Devices || []}
					licenses={!_.isUndefined(model) && _.isArray(model.Devices) && model.Devices.
						map(device => {
							let license
							// Device is an AP
							if (device.PartNumber.indexOf('MR') > -1 && device.Category === 'Wireless')
								license = devices.find(x => x.PartNumber === `LIC-ENT-${model.LicenceYears}YR`)
							else if (device.PartNumber.indexOf('Z1') > -1 && device.Category === 'UTM')
								license = devices.find(x => x.PartNumber === `LIC-Z1-ENT-${model.LicenceYears}YR`)
							else if (device.Category !== 'Accesories')
								license = devices.find(x => x.PartNumber === `LIC-${device.PartNumber.replace('-HW', '')}-${model.LicenceYears}YR`)
							if (!!license)
								license.Qty = device.Qty
							return license
						}).
						filter(device => !_.isUndefined(device))
					}
					onUpdate={onUpdate}
					onSelect={onSelect}
					selectedAll={state.selectedAll}
					model={model}
				/>
			</Col>
		</Row>
		<hr/>
		<Row className="MerakiQuotesEdit__totals">
			<Col sm={5}>
				<MerakiQuotesEditVariablesForm 
					onUpdate={onUpdate}
					model={model}
				/>
			</Col>
			<Col sm={7}>
				<MerakiQuotesEditTotals />
			</Col>
		</Row>
		<MerakiQUotesCreateModal 
			show={state.isShowingMerakiQuotesCreateModal}
			onToggle={toggleModal}
			onSubmit={patch => {toggleModal(); onUpdate(patch)}}
			title="Editar Quote"
			model={model}
		/>
	</Panel>