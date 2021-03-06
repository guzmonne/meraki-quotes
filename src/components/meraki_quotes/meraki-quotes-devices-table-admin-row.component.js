import React from 'react'
import {Media} from 'react-bootstrap'
import {
	formatMoney
} from '../../modules/formats.module.js'

import Service from '../../modules/service/service.module.js'

const MerakiQuotesDevicesTableAdminRow = ({model, isLogActivated}) =>
	<tr>
		<td></td>
		<td>
			<Media>
				<Media.Left>
				</Media.Left>
				<Media.Body>
					<Media.Heading>Administración</Media.Heading>
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
				{formatMoney( Service.from(model, {isLogActivated}).calculateAdministrationCost() )}
			</p>
		</td>
</tr>

MerakiQuotesDevicesTableAdminRow.propTypes = {
	model: React.PropTypes.object.isRequired
}

export default MerakiQuotesDevicesTableAdminRow