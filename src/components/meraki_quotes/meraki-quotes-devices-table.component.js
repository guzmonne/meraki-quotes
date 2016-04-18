import React from 'react'
import {Table, Input, Media} from 'react-bootstrap'
import accounting from 'accounting'
import _ from 'lodash'

const tableWidths = {
	select: '3%',
	qty: '8%',
	intro: '8%',
	margin: '5%',
	discount: '5%',
	salesPrice: '10%',
	subTotal: '10%',
	listPrice: '10%'
}

const moneyOptions = {
	decimal: ',',
	thousand: '.'
}

const ListPrice = ({device, discount, margin, intro, quantity=1}) => 
	<p>
		{accounting.formatMoney(device.Price * (1 - discount) * (1 + intro) / (1 - margin) * quantity, moneyOptions)}
	</p>

const SubTotal = ({device, discount, margin, intro}) => 
	<ListPrice 
		discount={device.Discount || discount}
		margin={device.Margin || margin}
		intro={device.Intro || intro}
		device={device}
		quantity={device.Qty || 1}
	/>

const DeviceRow = ({device, model, onUpdate, index, onSelect}) => 
	<tr>
		<td>
			{device.PartNumber.indexOf('LIC') === -1 ? 
				<input
					type="checkbox"
					onChange={() => onSelect(index)}
					checked={!!device.selected}
				/>
				:
				null
			}
		</td>
		<td>
			<Media>
				<Media.Left>
				{device.PartNumber.indexOf('LIC') === -1 ? 
					<img src={device.ImageUrl} alt={device.PartNumber} width={72}/>
					:
					null
				}
				</Media.Left>
				<Media.Body>
					<Media.Heading>{device.PartNumber}</Media.Heading>
					<p>{device.Description}</p>
				</Media.Body>
			</Media>
		</td>
		<td>
			<p>
				{accounting.formatMoney(device.Price, moneyOptions)}
			</p>
		</td>
		<td>
			{device.PartNumber.indexOf('LIC') === -1 ? 
				<Input 
					type="text"
					defaultValue={device.Qty}
					onChange={e => onUpdate(Object.assign({}, device, {Qty: +e.target.value}), index)}
				/>
				:
				<p className="text-center">{device.Qty}</p>
			}
		</td>
		<td className="text-center text-muted">
			<p>
				{`${(device.Discount || model.Discount)*100}%`}
			</p>
		</td>
		<td className="text-center">
			{device.PartNumber.indexOf('LIC') === -1 ? 
				<Input 
					type="text"
					defaultValue={device.Intro * 100}
					onChange={e => onUpdate(Object.assign({}, device, {Intro: +e.target.value/100}), index)}
				/>
				:
				<p className="text-center">-</p>
			}
		</td>
		<td className="text-center text-muted">
			<p>
				{device.PartNumber.indexOf('LIC') === -1 ? 
					`${(device.Margin || model.HardwareMargin)*100}%`
					:
					`${(device.Margin || model.SoftwareMargin)*100}%`
				}
			</p>
		</td>
		<td>
			{device.PartNumber.indexOf('LIC') === -1 ?
				<ListPrice 
					margin={device.Margin || model.HardwareMargin}
					discount={device.Discount || model.Discount}
					intro={device.Intro}
					device={device}
				/>
				:
				<ListPrice 
					margin={device.Margin || model.SoftwareMargin}
					discount={device.Discount || model.Discount}
					intro={0}
					device={device}
				/>
			}
		</td>
		<td>
			{device.PartNumber.indexOf('LIC') === -1 ?
				<SubTotal 
					margin={device.Discount || model.HardwareMargin}
					discount={device.Discount || model.Discount}
					intro={device.Intro}
					device={device}
				/>
				:
				<SubTotal 
					margin={device.Discount || model.SoftwareMargin}
					discount={device.Discount || model.Discount}
					intro={0}
					device={device}
				/>
			}
		</td>
	</tr>

const MerakiQuotesDevicesTableTbody = ({licenses=[], collection=[], model, discount, margin, intro, onUpdate, onSelect}) =>
	!_.isArray(collection) || collection.length === 0 ? 
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
					intro={intro}
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
		</tbody>

const MerakiQuotesDevicesTableThead = ({onSelect, selectedAll}) =>
	<thead>
		<tr>
			<th width={tableWidths.select}>
				<input
					type="checkbox"
					onChange={() => onSelect('all')}
					checked={selectedAll}
				/>
			</th>
			<th>Hardware</th>
			<th width={tableWidths.listPrice}>
				{'Precio de Lista '}<span className="text-muted">(USD)</span>
			</th>
			<th className="text-center" width={tableWidths.qty}>
				Qty
			</th>
			<th className="text-center" width={tableWidths.discount}>
				{'Desc. '}<span className="text-muted">(%)</span>
			</th>
			<th className="text-center" width={tableWidths.intro}>
				{'Intro. '}<span className="text-muted">(%)</span>
			</th>
			<th className="text-center" width={tableWidths.margin}>
				{'Margen '}<span className="text-muted">(%)</span>
			</th>
			<th width={tableWidths.salesPrice}>
				{'Precio de Venta '}<span className="text-muted">(USD)</span>
			</th>
			<th width={tableWidths.subTotal}>
				{'Sub-Total '}<span className="text-muted">(USD)</span>
			</th>
		</tr>
	</thead>

export default ({licenses, collection, model, onUpdate, onSelect, selectedAll}) =>
	<Table className="MerakiQuotesDevicesTable">
		<MerakiQuotesDevicesTableThead onSelect={onSelect} selectedAll={selectedAll} />
		<MerakiQuotesDevicesTableTbody 
			collection={collection}
			licenses={licenses}
			model={model}
			onUpdate={onUpdate}
			onSelect={onSelect}
		/>
	</Table>