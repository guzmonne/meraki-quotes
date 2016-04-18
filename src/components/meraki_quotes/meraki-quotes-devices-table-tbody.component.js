import React from 'react'
import {Media} from 'react-bootstrap'
import DeviceRow from './meraki-quotes-devices-table-row.component.js'
import accounting from 'accounting'

const moneyOptions = {
	decimal: ',',
	thousand: '.'
}

const SERVICE_LEVEL_CONSTANTS = {
	'9x5xNBD': {
		admin: 4.39,
		service: 0.972
	},
	'24x7x4': {
		admin: 5.96,
		service: 2.08
	}
}

function calculateAdministrationCost(licenses, model){
	return licenses.reduce((acc, license) =>
		acc + license.Price * (1 - model.Discount) * SERVICE_LEVEL_CONSTANTS[model.ServiceLevel].admin / 36
	, 0)
}

function calculateServiceCost(licenses, model){
	return licenses.reduce((acc, license) =>
		acc + license.Price * (1 - model.Discount) * SERVICE_LEVEL_CONSTANTS[model.ServiceLevel].service / 36
	, 0)
}

function calculateHardwareCost(collection, model){
	return collection.reduce((acc, device) => {
		console.log(device)
		return acc + device.Price * (1 - model.Discount) * (1 + device.Intro) / (1 - model.HardwareMargin)
	}
	, 0)
}

function formatMoney(value){
	return accounting.formatMoney(value, moneyOptions)
}

export default ({
	licenses=[],
	collection=[],
	model,
	onUpdate,
	onSelect
}) => {
	return !_.isArray(collection) || collection.length === 0 ? 
		<tbody><tr><td className="text-center" colSpan="9">Lista de equipos vacía.</td></tr></tbody>
	:
		<tbody>
			<tr><td colSpan={9} className="MerakiQuotesDevicesTable__title_row">Hardware</td></tr>
			{collection.map((device, i) => 
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
			{licenses.map((license, i) =>
				<DeviceRow
					key={license.PartNumber + i}
					onUpdate={onUpdate}
					onSelect={onSelect}
					device={license}
					model={model}
					index={i}
				/>
			)}
			<tr><td colSpan={9} className="MerakiQuotesDevicesTable__title_row">Administración, Soporte y Financiación</td></tr>
			<tr>
				<td></td>
				<td>
					<Media>
						<Media.Left>
						</Media.Left>
						<Media.Body>
							<Media.Heading>Servicio</Media.Heading>
							<p>Cuota mensual</p>
						</Media.Body>
					</Media>
				</td>
				<td>
					<p>
						{formatMoney(calculateServiceCost(licenses, model))}
					</p>
				</td>
				<td className="text-center"><p>-</p></td>
				<td className="text-center"><p>-</p></td>
				<td className="text-center"><p>-</p></td>
				<td className="text-center text-muted">
					<p>
						{`${model.AdminMargin*100}%`}
					</p>
				</td>
				<td className="text-center"><p>-</p></td>
				<td>
					<p>
						{formatMoney(calculateServiceCost(licenses, model) / (1-model.AdminMargin))}
					</p>
				</td>
			</tr>
			<tr>
				<td></td>
				<td>
					<Media>
						<Media.Left>
						</Media.Left>
						<Media.Body>
							<Media.Heading>Administración</Media.Heading>
							<p>Cuota mensual</p>
						</Media.Body>
					</Media>
				</td>
				<td>
					<p>
						{formatMoney(calculateAdministrationCost(licenses, model))}
					</p>
				</td>
				<td className="text-center"><p>-</p></td>
				<td className="text-center"><p>-</p></td>
				<td className="text-center"><p>-</p></td>
				<td className="text-center text-muted">
					<p>
						{`${model.AdminMargin*100}%`}
					</p>
				</td>
				<td className="text-center"><p>-</p></td>
				<td>
					<p>
						{formatMoney(calculateAdministrationCost(licenses, model) / (1-model.AdminMargin))}
					</p>
				</td>
			</tr>
			<tr>
				<td></td>
				<td>
					<Media>
						<Media.Left>
						</Media.Left>
						<Media.Body>
							<Media.Heading>Financiación de Equipos</Media.Heading>
							<p>Cuota mensual bajo contrato a 36 meses</p>
						</Media.Body>
					</Media>
				</td>
				<td className="text-center"><p>-</p></td>
				<td className="text-center"><p>-</p></td>
				<td className="text-center text-muted"><p>{`${model.Discount*100}%`}</p></td>
				<td className="text-center text-muted">
					<p>
						{`${(collection.reduce((acc, device) => device.Intro + acc, 0) / collection.length)*100}%`}
					</p>
				</td>
				<td className="text-center text-muted">
					<p>
						{`${model.HardwareMargin*100}%`}
					</p>
				</td>
				<td className="text-center"><p>-</p></td>
				<td>
					<p>
						{formatMoney(calculateHardwareCost(collection, model) / (1-model.AdminMargin))}
					</p>
				</td>
			</tr>
		</tbody>
}