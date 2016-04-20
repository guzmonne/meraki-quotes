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
import MerakiQuotesCreateModal from './meraki-quote-create-modal.component.js'

import {
	merakiQuotesDevicesAdd,
	merakiQuotesDevicesRemove
} from '../../modules/meraki-quotes-devices.module.js'

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
			onAdd={device => {
				merakiQuotesDevicesAdd(model.Devices, device, model.LicenceYears, devices, Devices => 
					onUpdate({Devices})
				)
			}}
		/>

		<MerakiQuotesEditSettings
			model={model}
			onUpdate={onUpdate}
			onRemoveDevice={() => {
				merakiQuotesDevicesRemove(model.Devices, model.LicenceYears, devices, Devices => 
					onUpdate({Devices})
				)
			}}
		/>

		<Row>
			<Col xs={12}>
				<MerakiQuotesDevicesTable 
					collection={model.Devices || []}
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
				<MerakiQuotesEditTotals 
					collection={model.Devices}
					quote={model}
				/>
			</Col>
		</Row>
		<MerakiQuotesCreateModal 
			show={state.isShowingMerakiQuotesCreateModal}
			onToggle={toggleModal}
			onSubmit={patch => {toggleModal(); onUpdate(patch)}}
			title="Editar Quote"
			model={model}
		/>
	</Panel>