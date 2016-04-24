import React from 'react'
import {Media} from 'react-bootstrap'
import {
	calculateServiceCost,
	calculateServiceLogPrice,
	formatMoney
} from '../../modules/meraki-quotes-devices.module.js'

const MerakiQuotesDevicesTableServiceRow = ({model, isLogActivated}) =>
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
		{!!isLogActivated ? 
			<td className="text-center">
				<p>-</p>
			</td>
			:
			<td>
				<p>
					{formatMoney(calculateServiceCost(model.Devices, model))}
				</p>
			</td>
		}
		<td className="text-center"><p>-</p></td>
		<td className="text-center"><p>-</p></td>
		<td className="text-center"><p>-</p></td>
		<td className="text-center text-muted">
			<p>
				{`${Math.round(model.ServiceMargin*100, 2)}%`}
			</p>
		</td>
		<td className="text-center"><p>-</p></td>
		<td>			
			{!!isLogActivated ? 
				<p>
					{formatMoney(calculateServiceLogPrice(model))}
				</p>
				:
				<p>
					{formatMoney(calculateServiceCost(model.Devices, model) / (1-model.ServiceMargin))}
				</p>
			}
		</td>
</tr>

MerakiQuotesDevicesTableServiceRow.propTypes = {
	model: React.PropTypes.object.isRequired
}

export default MerakiQuotesDevicesTableServiceRow