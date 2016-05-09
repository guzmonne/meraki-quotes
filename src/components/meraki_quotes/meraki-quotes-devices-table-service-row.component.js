import React from 'react'
import {Media} from 'react-bootstrap'
import {
	formatMoney
} from '../../modules/formats.module.js'

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
		<td className="text-center"><p>-</p></td>
		<td className="text-center"><p>-</p></td>
		<td className="text-center"><p>-</p></td>
		<td className="text-center"><p>-</p></td>
		<td className="text-center text-muted">
			<p>
				{`30%`}
			</p>
		</td>
		<td className="text-center"><p>-</p></td>
		<td>			
			<p>
				{formatMoney( Service.from(model, {isLogActivated}).calculateServiceCost() )}
			</p>
		</td>
</tr>

MerakiQuotesDevicesTableServiceRow.propTypes = {
	model: React.PropTypes.object.isRequired
}

export default MerakiQuotesDevicesTableServiceRow