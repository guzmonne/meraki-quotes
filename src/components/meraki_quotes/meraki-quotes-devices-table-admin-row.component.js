import React from 'react'
import {Media} from 'react-bootstrap'
import {
	calculateAdministrationCost,
	formatMoney
} from '../../modules/meraki-quotes-devices.module.js'

const MerakiQuotesDevicesTableAdminRow = ({collection, model}) =>
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
		<td>
			<p>
				{formatMoney(calculateAdministrationCost(collection, model))}
			</p>
		</td>
		<td className="text-center"><p>-</p></td>
		<td className="text-center"><p>-</p></td>
		<td className="text-center"><p>-</p></td>
		<td className="text-center text-muted">
			<p>
				{`${model.AdminMargin*100}%`}
			</p>
		</td>
		<td className="text-center"><p>-</p></td>
		<td>
			<p>
				{formatMoney(calculateAdministrationCost(collection, model) / (1-model.AdminMargin))}
			</p>
		</td>
</tr>

MerakiQuotesDevicesTableAdminRow.propTypes = {
	collection: React.PropTypes.array.isRequired,
	model: React.PropTypes.object.isRequired
}

export default MerakiQuotesDevicesTableAdminRow