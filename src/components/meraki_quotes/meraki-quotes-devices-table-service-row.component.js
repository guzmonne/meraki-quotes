import React from 'react'
import {Media} from 'react-bootstrap'
import {
	formatMoney
} from '../../modules/meraki-quotes-devices.module.js'

import Service from '../../modules/service/service.module.js'

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
		<td>
			<p>
				{formatMoney( Service.from(model, {isLogActivated}).calculateServiceCost() )}
			</p>
		</td>
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
			<p>
				{formatMoney( Service.from(model, {isLogActivated}).calculateServicePrice() )}
			</p>
		</td>
</tr>

MerakiQuotesDevicesTableServiceRow.propTypes = {
	model: React.PropTypes.object.isRequired
}

export default MerakiQuotesDevicesTableServiceRow