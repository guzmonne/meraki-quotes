import React from 'react'
import DeviceRow from './meraki-quotes-devices-table-row.component.js'
import Service from '../../modules/service/service.module.js'
import MerakiQuotesDevicesTableServiceRow from './meraki-quotes-devices-table-service-row.component.js'
import MerakiQuotesDevicesTableAdminRow from './meraki-quotes-devices-table-admin-row.component.js'
import MerakiQuotesDevicesTableFinancingRow from './meraki-quotes-devices-table-financing-row.component.js'
import MerakiQuotesDevicesTableLicenseRow from './meraki-quotes-devices-table-license-row.component.js'
import LoadingContainer from '../helpers/loading-container.component.js'

export default ({
	model,
	onUpdate,
	onSelect,
	isLogActivated
}) =>
	<LoadingContainer
		loading={!_.isArray(model.Devices) || model.Devices.length === 0}
		loadingComponent={<tbody><tr><td className="text-center" colSpan="9">Lista de equipos vacía.</td></tr></tbody>}
	>
		<tbody>
			<tr><td colSpan={9} className="MerakiQuotesDevicesTable__title_row">Hardware</td></tr>
			{Service.from(model).getHardware().map((device, i) => 
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
			{Service.from(model).getLicenses().map((license, i) =>
				<DeviceRow
					key={license.PartNumber + i}
					device={license}
					model={model}
					index={i}
				/>
			)}
			<tr><td colSpan={9} className="MerakiQuotesDevicesTable__title_row">Administración, Soporte y Financiación</td></tr>
			<MerakiQuotesDevicesTableServiceRow model={model} />
			<MerakiQuotesDevicesTableAdminRow model={model} />
			<MerakiQuotesDevicesTableLicenseRow model={model} />
			<MerakiQuotesDevicesTableFinancingRow model={model}
			/>
		</tbody>
	</LoadingContainer>