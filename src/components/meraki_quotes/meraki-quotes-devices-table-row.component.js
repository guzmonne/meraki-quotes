import React from 'react'
import {Media, Input} from 'react-bootstrap'
import accounting from 'accounting'

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

export default ({device, model, onUpdate, index, onSelect}) => {
	return device.PartNumber.indexOf('LIC') === -1 ?
		<tr>
			<td>
				<input
					type="checkbox"
					onChange={() => onSelect(index)}
					checked={!!device.selected}
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
					onChange={e => onUpdate(Object.assign({}, device, {Qty: +e.target.value}), index)}
				/>
			</td>
			<td className="text-center text-muted">
				<p>
					{`${model.Discount*100}%`}
				</p>
			</td>
			<td>
				<Input 
					type="text"
					value={device.Intro * 100}
					onChange={e => onUpdate(Object.assign({}, device, {Intro: +e.target.value/100}), index)}
				/>
			</td>
			<td className="text-center text-muted">
				<p>{`${model.HardwareMargin*100}%`}</p>
			</td>
			<td>
				<p>
					{accounting.formatMoney(
						device.Price * (1 - model.Discount) * (1 + device.Intro) / (1 - model.HardwareMargin), 
						moneyOptions
					)}
				</p>
			</td>
			<td>
				<p>
					{accounting.formatMoney(
						device.Price * (1 - model.Discount) * (1 + device.Intro) / (1 - model.HardwareMargin) * device.Qty, 
						moneyOptions
					)}
				</p>
			</td>
		</tr>
		:
		<tr>
			<td></td>
			<td>
				<Media>
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
			<td className="text-center">
				<p>{device.Qty}</p>
			</td>
			<td className="text-center text-muted">
				<p>
					{`${model.Discount*100}%`}
				</p>
			</td>
			<td className="text-center">
				<p>-</p>
			</td>
			<td className="text-center text-muted">
				<p>{`${model.SoftwareMargin*100}%`}</p>
			</td>
			<td>
				<p>
					{accounting.formatMoney(
						device.Price * (1 - model.Discount) / (1 - model.SoftwareMargin), 
						moneyOptions
					)}
				</p>
			</td>
			<td>
				<p>
					{accounting.formatMoney(
						device.Price * (1 - model.Discount) / (1 - model.SoftwareMargin) * device.Qty, 
						moneyOptions
					)}
				</p>
			</td>
		</tr>
}