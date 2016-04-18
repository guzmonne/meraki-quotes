import React from 'react'
import {Table, Input, Media} from 'react-bootstrap'
import accounting from 'accounting'
import _ from 'lodash'

import MerakiQuotesDevicesTableThead from './meraki-quotes-devices-table-thead.component.js'
import MerakiQuotesDevicesTableTbody from './meraki-quotes-devices-table-tbody.component.js'

export default ({licenses, collection, model, onUpdate, onSelect, selectedAll}) =>
	<Table className="MerakiQuotesDevicesTable">
		<MerakiQuotesDevicesTableThead onSelect={onSelect} selectedAll={selectedAll} />
		<MerakiQuotesDevicesTableTbody 
			collection={collection}
			licenses={licenses}
			model={model}
			onUpdate={onUpdate}
			onSelect={onSelect}
		/>
	</Table>