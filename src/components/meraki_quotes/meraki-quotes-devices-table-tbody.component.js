import React from 'react'
import DeviceRow from './meraki-quotes-devices-table-row.component.js'
import {
	calculateAdministrationCost,
	calculateServiceCost,
	calculateHardwareCost,
	calculateSoftwareCost,
	getLicenses,
	getHardware,
	formatMoney
} from '../../modules/meraki-quotes-devices.module.js'
import MerakiQuotesDevicesTableServiceRow from './meraki-quotes-devices-table-service-row.component.js'
import MerakiQuotesDevicesTableAdminRow from './meraki-quotes-devices-table-admin-row.component.js'
import MerakiQuotesDevicesTableFinancingRow from './meraki-quotes-devices-table-financing-row.component.js'

export default ({
	model,
	onUpdate,
	onSelect,
	isLogActivated
}) => {
	return !_.isArray(model.Devices) || model.Devices.length === 0 ? 
		<tbody><tr><td className="text-center" colSpan="9">Lista de equipos vacía.</td></tr></tbody>
	:
		<tbody>
			<tr><td colSpan={9} className="MerakiQuotesDevicesTable__title_row">Hardware</td></tr>
			{getHardware(model.Devices).map((device, i) => 
				<DeviceRow
					key={device.PartNumber + i}
					onUpdate={onUpdate}
					onSelect={onSelect}
					device={device}
					model={model}
					index={i}
				/>
			)}
			<tr><td colSpan={9} className="MerakiQuotesDevicesTable__title_row">Software</td></tr>
			{getLicenses(model.Devices).map((license, i) =>
				<DeviceRow
					key={license.PartNumber + i}
					device={license}
					model={model}
					index={i}
				/>
			)}
			<tr><td colSpan={9} className="MerakiQuotesDevicesTable__title_row">Administración, Soporte y Financiación</td></tr>
			<MerakiQuotesDevicesTableServiceRow 
				model={model}
				isLogActivated={isLogActivated}
			/>
			<MerakiQuotesDevicesTableAdminRow 
				model={model}
				isLogActivated={isLogActivated}
			/>
			<MerakiQuotesDevicesTableFinancingRow 
				model={model}
			/>
		</tbody>
}