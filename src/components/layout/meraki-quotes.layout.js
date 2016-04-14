import React from 'react'
import {
	Grid,
	Row,
	Col,
	Panel
} from 'react-bootstrap'
import MerakiQuotesMenu from '../menus/meraki-quotes-menu.component.js'
import MerakiQuotesBreadcrumbs from '../meraki_quotes/meraki-quotes-breadcrumbs.component.js'

export default ({
	children,
	state,
	onUpdate,
	onFetch,
	page="index"
}) =>
	<Grid className="MerakiQuotesLayout">
		<div className="Row">
			<Col sm={3}>
				<MerakiQuotesMenu />
			</Col>

			<Col sm={9}>
				<Row>
					<Col smOffset={9} sm={3}>
						<MerakiQuotesBreadcrumbs page={page} />
					</Col>
				</Row>
				{children}
			</Col>
		</div>

	</Grid>