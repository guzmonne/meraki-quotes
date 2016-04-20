import React from 'react'
import {Media} from 'react-bootstrap'
import {
	calculateHardwareCost,
	formatMoney
} from '../../modules/meraki-quotes-devices.module.js'

const MerakiQuotesDevicesTableFinancingRow = ({collection, model}) =>
	<tr>
		<td></td>
		<td>
			<Media>
				<Media.Left>
				</Media.Left>
				<Media.Body>
					<Media.Heading>Financiación de Equipos</Media.Heading>
					<p>Cuota mensual bajo contrato a <strong>36 meses</strong></p>
				</Media.Body>
			</Media>
		</td>
		<td className="text-center"><p>-</p></td>
		<td className="text-center"><p>-</p></td>
		<td className="text-center text-muted"><p>{`${model.Discount*100}%`}</p></td>
		<td className="text-center"><p>-</p></td>
		<td className="text-center text-muted"><p>{`${model.HardwareMargin*100}%`}</p></td>
		<td className="text-center"><p>-</p></td>
		<td>
			<p>
				{formatMoney(calculateHardwareCost(collection, model) * 0.04)}
			</p>
		</td>
	</tr>

MerakiQuotesDevicesTableFinancingRow.propTypes = {
	collection: React.PropTypes.array.isRequired,
	model: React.PropTypes.object.isRequired
}

export default MerakiQuotesDevicesTableFinancingRow