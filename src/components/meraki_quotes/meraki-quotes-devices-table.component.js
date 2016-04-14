import React from 'react'
import {Table, Input, Media} from 'react-bootstrap'
import accounting from 'accounting'

const tableWidths = {
	select: '3%',
	qty: '8%',
	intro: '5%',
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

const devices = [
	{
	  "Category": "Switches",
	  "createdAt": "2016-04-06T03:08:36.958Z",
	  "Description": "Meraki MS320-48 L3 Cloud Managed 48 Port GigE Switch",
	  "ID": "bcb68846-b97b-4cdb-9ccc-4b6199d6a6b0",
	  "ImageUrl": "https://www.meraki.com/img/products/icons/ms320-48.jpg",
	  "PartNumber": "MS320-48-HW",
	  "Price": 6655,
	  "Qty": 10
	},
	{
	  "Category": "Switches",
	  "createdAt": "2016-04-06T03:21:22.487Z",
	  "Description": "Meraki MS410-16 Cld-Mngd 16x GigE SFP Switch",
	  "ID": "95698dff-ad8e-4288-ab78-6b3a7c4b04fc",
	  "ImageUrl": "https://www.meraki.com/img/products/icons/ms410-16.jpg",
	  "PartNumber": "MS410-16-HW",
	  "Price": 8500,
	  "Qty": 2
	},
	{
	  "Category": "Wireless",
	  "createdAt": "2016-04-06T03:37:50.956Z",
	  "Description": "Meraki MR32 Cloud Managed AP",
	  "ID": "ec8d6b7d-d820-40f9-b5a2-d20f20cd62a9",
	  "ImageUrl": "https://www.meraki.com/img/products/icons/mr32.jpg",
	  "PartNumber": "MR32-HW",
	  "Price": 799,
	  "Qty": 100
	},
	{
	  "Category": "UTM",
	  "createdAt": "2016-04-06T03:36:06.382Z",
	  "Description": "Meraki MX64W Cloud Managed Security Appliance with 802.11ac",
	  "ID": "9359a018-c900-47f6-a971-bf24e45b8dc2",
	  "ImageUrl": "https://www.meraki.com/img/products/appliances/overview/models/overview-model-mx64w.jpg",
	  "PartNumber": "MX64W-HW",
	  "Price": 945,
	  "Qty": 4
	}
]

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

export default ({collection, discount=0.43, intro=0.25, margin=0.20}) =>
	<Table className="MerakiQuotesDevicesTable">
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
		<tbody>
		{devices.map((device, i) => 
			<tr key={i}>
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
				<td className="text-center text-muted">
					<p>
						{`${(device.Intro || intro)*100}%`}
					</p>
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
		)}
		</tbody>
	</Table>