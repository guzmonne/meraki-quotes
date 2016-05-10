import React from 'react'
import _ from 'lodash'
import {
	Grid,
	Row,
	Col,
	Panel,
	ButtonToolbar,
	ButtonGroup,
	Button,
	Modal,
	Pager,
	PageItem
} from 'react-bootstrap'
import MerakiDevicesTable from './meraki-devices-table.component.js'
import Refresher from '../helpers/refresher.component.js'
import RefreshButton from '../helpers/refresh-button.component.js'
import PriceListDropdown from './price-list-dropdown.component.js'
import MerakiDeviceCreateModal from './meraki-device-create-modal.component.js'
import Spinner from '../helpers/spinner.component.js'
import PageSizeForm from '../helpers/page-size-form.component.js'
import InlineSearchForm from '../helpers/inline-search-form.component.js'

export default ({
	onUpdate,
	onCreate,
	onEdit,
	onSelect,
	onDelete,
	onPriceListSelection,
	merakiDevices,
	toggleModal,
	setFormDevice,
	setPageSize,
	setQueryString
}) =>
	<Grid fluid className="MerakiPriceList">
		<Panel>
			<Row>
				<Col xs={12}>
					<h4>Meraki - Lista de Precios</h4>
				</Col>
			</Row>
			{typeof merakiDevices.error === "string" &&
				<Row>
					<Col xs={12}>
						<Panel header="Error" bsStyle="primary">
							{merakiDevices.error}
						</Panel>
					</Col>
				</Row>
			}
			<Row>
				<Col xs={6}>
					<ButtonToolbar>
						<ButtonGroup>
							<RefreshButton 
								onClick={() => onUpdate(0)}
								refreshing={merakiDevices.isGettingMerakiDevices}
							/>
						</ButtonGroup>
						<ButtonGroup>
							<Button onClick={() => {
								setFormDevice()
								toggleModal()
							}}>
								<i className="fa fa-plus"></i>{' Nuevo'}
							</Button>
						</ButtonGroup>
						<ButtonGroup>
							<Button onClick={() => {
								setFormDevice(false)
								toggleModal()
							}} 
							className="btn-warning"
							disabled={merakiDevices.selectedDevices.length !== 1}>
								<i className="fa fa-pencil"></i>{' Editar'}
							</Button>
						</ButtonGroup>
						<ButtonGroup>
							<Button 
								className="btn-primary"
								onClick={onDelete}
								disabled={merakiDevices.selectedDevices.length === 0}
							>
								<i className="fa fa-trash"></i>{' Eliminar'}
							</Button>
						</ButtonGroup>
					</ButtonToolbar>
				</Col>
				<Col xs={3}>
					<InlineSearchForm 
						transform={(x) => _.isString(x) ? x.toUpperCase() : x}
						onChange={queryString => {
							setQueryString(queryString)
							onUpdate(0)
						}}
					/>
				</Col>
				<Col xs={3}>
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
						collection={merakiDevices.collection} 
						selected={merakiDevices.selectedDevices}
						onSelect={onSelect}
						onUpdate={onUpdate}
					/>
				</Col>
				{merakiDevices.queryString === "" &&
					<Col xs={4}>
						<PageSizeForm onSelect={pageSize => {
							setPageSize(pageSize)
							onUpdate(0)
						}} />
					</Col>
				}
				{merakiDevices.queryString === "" &&
					<Col xs={4}>
						{merakiDevices.total ? 
							<div className="text-center index-count">
								<p>
									{(merakiDevices.page * merakiDevices.pageSize) + 1} 
									{' al '}
									{(merakiDevices.page + 1) * merakiDevices.pageSize > merakiDevices.total ? merakiDevices.total : (merakiDevices.page + 1) * merakiDevices.pageSize}
									{' de '}
									{merakiDevices.queryString === "" ? merakiDevices.total : merakiDevices.count}
								</p>
							</div>
							:
							null
						}
					</Col>
				}
				{merakiDevices.queryString === "" &&
					<Col xs={4}>
						<div className="pull-right">
						  <Pager>
						    <PageItem
						    	disabled={merakiDevices.page - 1 < 0 || merakiDevices.isGettingMerakiDevices}
						    	onSelect={() => onUpdate(-1)}
						    >
						    	Anterior
					    	</PageItem>
						    {' '}
						    <PageItem 
						    	disabled={(merakiDevices.page + 1) * merakiDevices.pageSize > merakiDevices.total || merakiDevices.isGettingMerakiDevices}
						    	onSelect={() => onUpdate(1)}
						    >
						    	Siguiente
					    	</PageItem>
						  </Pager>
						</div>
					</Col>
				}
			</Row>
		</Panel>
		{/*MODAL*/}

		<MerakiDeviceCreateModal 
			onShow={merakiDevices.isShowingMerakiDeviceCreateModal}
			onToggle={toggleModal}
			onSubmit={onCreate}
			model={merakiDevices.current}
		/>

	</Grid>