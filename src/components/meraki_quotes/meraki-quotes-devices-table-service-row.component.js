import React from 'react'
import {Media} from 'react-bootstrap'
import {
	calculateServiceCost,
	formatMoney
} from '../../modules/meraki-quotes-devices.module.js'

const MerakiQuotesDevicesTableServiceRow = ({model}) =>
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
				{formatMoney(calculateServiceCost(model.Devices, model))}
			</p>
		</td>
		<td className="text-center"><p>-</p></td>
		<td className="text-center"><p>-</p></td>
		<td className="text-center"><p>-</p></td>
		<td className="text-center text-muted">
			<p>
				{`${model.ServiceMargin*100}%`}
			</p>
		</td>
		<td className="text-center"><p>-</p></td>
		<td>
			<p>
				{formatMoney(calculateServiceCost(model.Devices, model) / (1-model.ServiceMargin))}
			</p>
		</td>
</tr>

MerakiQuotesDevicesTableServiceRow.propTypes = {
	model: React.PropTypes.object.isRequired
}

export default MerakiQuotesDevicesTableServiceRow