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
	onFetch,
	page="index",
	toggleModal,
	// TODO: Pass in this model from the page
	model={},
	// TODO: Remove this line for the actual current user implementation
	user={}
}) =>
	<Panel className="MerakiQuotesEdit">
		<MerakiQuotesEditHeader toggleModal={toggleModal} model={model} user={user}/>
		
		<MerakiQuotesDeviceSearchForm />

		<MerakiQuotesEditSettings model={model} onUpdate={onUpdate} />

		<Row>
			<Col xs={12}>
				<MerakiQuotesDevicesTable 
					collection={model.ProductList || []}
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