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
		{accounting.formatMoney(device.Price * discount * (1 + intro) / (1 - margin) * quantity, moneyOptions)}
	</p>

const SubTotal = ({device, discount, margin, intro}) => 
	<ListPrice 
		discount={device.discount || discount}
		margin={device.margin || margin}
		intro={device.intro || intro}
		device={device}
		quantity={device.Qty || 1}
	/>

const DeviceRow = ({device, discount, margin, intro}) => 
	<tr>
		<td>
			<input
				type="checkbox"
				onChange={() => {}}
			/>
		</td>
		<td>
			<Media>
				<Media.Left>
					<img src={device.ImageUrl} alt={device.PartNumber} width={72}/>
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
			<Input 
				type="text"
				defaultValue={device.Qty}
			/>
		</td>
		<td className="text-center text-muted">
			<p>
				{`${(device.Discount || discount)*100}%`}
			</p>
		</td>
		<td className="text-center">
			<Input 
				type="text"
				defaultValue={device.Intro * 100}
			/>
		</td>
		<td className="text-center text-muted">
			<p>
				{`${(device.Margin || margin)*100}%`}
			</p>
		</td>
		<td>
			<ListPrice 
				discount={device.discount || discount}
				margin={device.margin || margin}
				intro={device.intro || intro}
				device={device}
			/>
		</td>
		<td>
			<SubTotal
				discount={device.discount || discount}
				margin={device.margin || margin}
				intro={device.intro || intro}
				device={device}
			/>
		</td>
	</tr>

const MerakiQuotesDevicesTableTbody = ({collection=[], discount, margin, intro}) =>
	!_.isArray(collection) || collection.length === 0 ? 
		<tbody><tr><td className="text-center" colSpan="9">Lista de equipos vacía.</td></tr></tbody>
	:
		<tbody>
			{collection.map((device, i) => <DeviceRow key={i} device={device} discount={discount} margin={margin} intro={intro} />)}
		</tbody>

const MerakiQuotesDevicesTableThead = () =>
	<thead>
		<tr>
			<th width={tableWidths.select}>
				<input
					type="checkbox"
					onChange={() => {}}
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

export default ({collection, discount=0.43, intro=0.25, margin=0.20}) =>
	<Table className="MerakiQuotesDevicesTable">
		<MerakiQuotesDevicesTableThead />
		<MerakiQuotesDevicesTableTbody 
			collection={collection}
			discount={discount}
			intro={intro}
			margin={margin}
		/>
	</Table>