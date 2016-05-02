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
import MerakiQuotesServiceChart from './meraki-quotes-service-chart.component.js'
import MerakiQuotesAdminChart from './meraki-quotes-admin-chart.component.js'
import Spinner from '../helpers/spinner.component.js'

import {
	merakiQuotesDevicesAdd,
	merakiQuotesDevicesRemove,
	getHardware,
	getLicenseFromList
} from '../../modules/meraki-quotes-devices.module.js'

export default ({
	children,
	state,
	onUpdate,
	onSelect,
	onFetch,
	page="index",
	toggleModal,
	toggleCharts,
	toggleLog,
	model={},
	devices=[],
	isGettingMerakiDevices=false,
	// TODO: Remove this line for the actual current user implementation
	user={}
}) =>
	isGettingMerakiDevices === false && state.isGettingMerakiQuote ? 
	<Panel className="loading">
		<h1>
			Cargando
			<br/>
			<Spinner />
		</h1>
	</Panel>
	:
	<Panel className="MerakiQuotesEdit">
		<MerakiQuotesEditHeader
			toggleModal={toggleModal}
			toggleCharts={toggleCharts}
			toggleLog={toggleLog}
			isShowingCharts={state.isShowingCharts}
			isLogActivated={state.isLogActivated}
			model={model}
		/>
		
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
			isLogActivated={state.isLogActivated}
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
					onUpdate={onUpdate}
					onSelect={onSelect}
					selectedAll={state.selectedAll}
					model={model}
					isLogActivated={state.isLogActivated}
				/>
				<hr/>
			</Col>
		</Row>
		{state.isShowingCharts && devices.length > 0 && model.Devices && model.Devices.length > 0 &&
			getHardware(model.Devices).
				map(hardware => {
					const license = getLicenseFromList(devices, hardware, model.LicenceYears)

					return (
						<Row key={license.PartNumber}>
							<Col xs={12}>
								<h4>{'Cuota mensual de servicio unitaria para el ' + hardware.PartNumber + ' según cantidad'}</h4>
								<MerakiQuotesServiceChart 
									license={license}
									quote={model}
								/>
							</Col>
							<Col xs={12}>
								<h4>{'Cuota mensual de administración unitaria para el ' + hardware.PartNumber + ' según cantidad'}</h4>
								<MerakiQuotesAdminChart 
									license={license}
									quote={model}
								/>
							</Col>
						</Row>
					)}	
				)
		}

		<Row className="MerakiQuotesEdit__totals">
			<Col sm={5}>
				<MerakiQuotesEditVariablesForm 
					onUpdate={onUpdate}
					model={model}
				/>
			</Col>
			<Col sm={7}>
				<MerakiQuotesEditTotals
					quote={model}
					isLogActivated={state.isLogActivated}
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