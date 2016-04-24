import React from 'react'
import {Table, Input, Media} from 'react-bootstrap'
import accounting from 'accounting'
import _ from 'lodash'

import MerakiQuotesDevicesTableThead from './meraki-quotes-devices-table-thead.component.js'
import MerakiQuotesDevicesTableTbody from './meraki-quotes-devices-table-tbody.component.js'

export default ({licenses, model, onUpdate, onSelect, selectedAll, isLogActivated}) =>
	<Table responsive className="MerakiQuotesDevicesTable">
		<MerakiQuotesDevicesTableThead
			onSelect={onSelect}
			selectedAll={selectedAll}
		/>
		<MerakiQuotesDevicesTableTbody
			model={model}
			onUpdate={onUpdate}
			onSelect={onSelect}
			isLogActivated={isLogActivated}
		/>
	</Table>