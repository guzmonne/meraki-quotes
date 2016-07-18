import React from 'react'
import {
	Row,
	Col,
	Panel,
	Input,
	Button
} from 'react-bootstrap'
import LoadingContainer from '../helpers/loading-container.component.js'
import MerakiQuotesMenu from '../menus/meraki-quotes-menu.component.js'
import MerakiQuotesBreadcrumbs from './meraki-quotes-breadcrumbs.component.js'
import MerakiQuotesDevicesTable from './meraki-quotes-devices-table.component.js'
import MerakiQuotesEditVariablesForm from './meraki-quotes-edit-variables-form.component.js'
import MerakiQuotesEditTotals from './meraki-quotes-edit-totals.component.js'
import MerakiQuotesDeviceSearchForm from './meraki-quotes-device-search-form.component.js'
import MerakiQuotesEditHeader from './meraki-quotes-edit-header.component.js'
import MerakiQuotesEditSettings from './meraki-quotes-edit-settings.component.js'
import MerakiQuotesCreateModal from './meraki-quote-create-modal.component.js'
import Spinner from '../helpers/spinner.component.js'

import {
	merakiQuotesDevicesAdd,
	merakiQuotesDevicesRemove
} from '../../modules/meraki-quotes-devices.module.js'

const loadingComponent = (
	<Panel className="loading">
		<h1>
			Cargando
			<br/>
			<Spinner />
		</h1>
	</Panel>
)

export default ({
	children,
	state,
	onUpdate,
	onSelect,
	onFetch,
	page="index",
	toggleCreateModal,
	toggleCloneModal,
	toggleLog,
	model={},
	devices=[],
	isGettingMerakiDevices
}) =>
	<LoadingContainer
		loading={isGettingMerakiDevices === true || state.isGettingMerakiQuote === true}
		loadingComponent={loadingComponent}
	>
		<Panel className="MerakiQuotesEdit">
			<MerakiQuotesEditHeader
				toggleModal={toggleCreateModal}
				toggleLog={toggleLog}
				isLogActivated={state.isLogActivated}
				model={model}
			/>
			
			<MerakiQuotesDeviceSearchForm
				devices={devices}
				updating={isGettingMerakiDevices} 
				onAdd={device => {
					merakiQuotesDevicesAdd(model, device, devices, Devices => 
						onUpdate({Devices})
					)
				}}
			/>

			<MerakiQuotesEditSettings
				model={model}
				isLogActivated={state.isLogActivated}
				onUpdate={onUpdate}
				onRemoveDevice={() => {
					merakiQuotesDevicesRemove(model, devices, Devices => 
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
				onToggle={toggleCreateModal}
				onSubmit={patch => {toggleCreateModal(); onUpdate(patch)}}
				title="Editar Quote"
				model={model}
			/>
		</Panel>
		
	</LoadingContainer>