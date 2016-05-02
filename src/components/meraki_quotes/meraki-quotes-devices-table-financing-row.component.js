import React from 'react'
import {Media} from 'react-bootstrap'
import {
	formatMoney
} from '../../modules/meraki-quotes-devices.module.js'

import Service from '../../modules/service/service.module.js'

const MerakiQuotesDevicesTableFinancingRow = ({model}) =>
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
		<td className="text-center text-muted"><p>{`${Math.round(model.Discount*100)}%`}</p></td>
		<td className="text-center"><p>-</p></td>
		<td className="text-center text-muted"><p>{`${Math.round(model.HardwareMargin*100)}%`}</p></td>
		<td className="text-center"><p>-</p></td>
		<td>
			<p>
				{formatMoney(
					Service.from(model).calculateHardwarePrice() * 0.04
				)}
			</p>
		</td>
	</tr>

MerakiQuotesDevicesTableFinancingRow.propTypes = {
	model: React.PropTypes.object.isRequired
}

export default MerakiQuotesDevicesTableFinancingRow