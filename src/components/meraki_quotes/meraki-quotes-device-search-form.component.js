import React from 'react'
import {Row, Col, Input, DropdownButton, Button, MenuItem} from 'react-bootstrap'
import accounting from 'accounting'

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
	  "Qty": 10,
	  "Intro": 0.2
	},
	{
	  "Category": "Switches",
	  "createdAt": "2016-04-06T03:21:22.487Z",
	  "Description": "Meraki MS410-16 Cld-Mngd 16x GigE SFP Switch",
	  "ID": "95698dff-ad8e-4288-ab78-6b3a7c4b04fc",
	  "ImageUrl": "https://www.meraki.com/img/products/icons/ms410-16.jpg",
	  "PartNumber": "MS410-16-HW",
	  "Price": 8500,
	  "Qty": 2,
	  "Intro": 0.2
	},
	{
	  "Category": "Wireless",
	  "createdAt": "2016-04-06T03:37:50.956Z",
	  "Description": "Meraki MR32 Cloud Managed AP",
	  "ID": "ec8d6b7d-d820-40f9-b5a2-d20f20cd62a9",
	  "ImageUrl": "https://www.meraki.com/img/products/icons/mr32.jpg",
	  "PartNumber": "MR32-HW",
	  "Price": 799,
	  "Qty": 100,
	  "Intro": 0.2
	},
	{
	  "Category": "UTM",
	  "createdAt": "2016-04-06T03:36:06.382Z",
	  "Description": "Meraki MX64W Cloud Managed Security Appliance with 802.11ac",
	  "ID": "9359a018-c900-47f6-a971-bf24e45b8dc2",
	  "ImageUrl": "https://www.meraki.com/img/products/appliances/overview/models/overview-model-mx64w.jpg",
	  "PartNumber": "MX64W-HW",
	  "Price": 945,
	  "Qty": 4,
	  "Intro": 0.2
	}
]

const CaretButton = ({collection}) =>
	<DropdownButton pullRight title="" id="MerakiQuotesDevicesOptions" open={true}>
		{collection.map((x, i) => 
			<MenuItem href="javascript:void(0)" key={i} className="MerakiDeviceOption">
				<table width="500px">
					<tbody>
						<tr>
							<td width="25%">{x.PartNumber}</td>
							<td width="60%">{x.Description.length > 35 ? x.Description.slice(0, 35) + '...' : x.Description }</td>
							<td width="15%">{accounting.formatMoney(x.Price, moneyOptions)}</td>
						</tr>
					</tbody>
				</table>
			</MenuItem>
		)}
	</DropdownButton>

export default class MerakiQuotesSearchForm extends React.Component {
	render(){
		return (
			<Row className="MerakiQuotesEdit__device_search_form">
				<Col sm={8}>
					<Input 
						type="text"
						placeholder="Buscar equipos por modelo o descripción"
						buttonAfter={<CaretButton collection={devices}></CaretButton>}
					/>
				</Col>
				<Col sm={2}>
					<Input 
						type="number"
						defaultValue={1}
					/>
				</Col>
				<Col sm={2}>
					<Button block>
						<i className="fa fa-plus"></i>{' Agregar'}
					</Button>
				</Col>
			</Row>
		)
	}
}