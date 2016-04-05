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
	Input,
	Pager,
	PageItem
} from 'react-bootstrap'
import MerakiDevicesTable from './meraki-devices-table.component.js'
import Refresher from '../helpers/refresher.component.js'
import RefreshButton from '../helpers/refresh-button.component.js'
import PriceListDropdown from './price-list-dropdown.component.js'
import MerakiDeviceCreateModal from './meraki-device-create-modal.component.js'
import Spinner from '../helpers/spinner.component.js'

export default ({
	onUpdate,
	onCreate,
	onEdit,
	onSelect,
	onDelete,
	onPriceListSelection,
	merakiDevices,
	toggleModal,
	setFormDevice
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
						collection={merakiDevices.collection} 
						selected={merakiDevices.selectedDevices}
						onSelect={onSelect}
						onUpdate={onUpdate}
					/>
				  <Pager>
				    <PageItem
				    	disabled={merakiDevices.page - 1 < 0 || merakiDevices.isGettingMerakiDevices}
				    	onSelect={() => onUpdate(-1)}
				    >
				    	Anterior
			    	</PageItem>
				    {' '}
				    <PageItem 
				    	disabled={!merakiDevices.pagination[merakiDevices.page + 1] || merakiDevices.isGettingMerakiDevices}
				    	onSelect={() => onUpdate(1)}
				    >
				    	Siguiente
			    	</PageItem>
				  </Pager>
				</Col>

				{merakiDevices.total && 
					<Col xs={12}>
						<div className="text-center">
							<p>
								{(merakiDevices.page * 10) + 1} 
								{' al '}
								{(merakiDevices.page + 1) * 10 > merakiDevices.total ? merakiDevices.total : (merakiDevices.page + 1) * 10}
								{' de '}
								{merakiDevices.total}</p>
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