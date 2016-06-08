import React from 'react'
import {Media} from 'react-bootstrap'
import {
	formatMoney
} from '../../modules/formats.module.js'

import Service from '../../modules/service/service.module.js'

const MerakiQuotesDevicesTableLicenseRow = ({model}) =>
	<tr>
		<td></td>
		<td>
			<Media>
				<Media.Left>
				</Media.Left>
				<Media.Body>
					<Media.Heading>Financiación de Licencias</Media.Heading>
					<p>Cuota mensual bajo contrato a <strong>{model.LicenceYears * 12} meses</strong></p>
				</Media.Body>
			</Media>
		</td>
		<td className="text-center"><p>-</p></td>
		<td className="text-center"><p>-</p></td>
		<td className="text-center text-muted"><p>{`${Math.round(model.Discount*100)}%`}</p></td>
		<td className="text-center"><p>-</p></td>
		<td className="text-center text-muted"><p>{`${Math.round(model.SoftwareMargin*100)}%`}</p></td>
		<td className="text-center"><p>-</p></td>
		<td>
			<p>
				{formatMoney( Service.from(model).calculateLicenseMonthlyPrice() )}
			</p>
		</td>
	</tr>

MerakiQuotesDevicesTableLicenseRow.propTypes = {
	model: React.PropTypes.object.isRequired
}

export default MerakiQuotesDevicesTableLicenseRow