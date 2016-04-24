import React from 'react'
import {connect} from 'react-redux'
import {doMerakiQuotesCreate} from '../../pages/meraki_quotes/actions/meraki-quotes.actions.js'
import {
	Grid,
	Row,
	Col,
	Panel
} from 'react-bootstrap'
import MerakiQuotesMenu from '../menus/meraki-quotes-menu.component.js'
import MerakiQuotesBreadcrumbs from '../meraki_quotes/meraki-quotes-breadcrumbs.component.js'

class MerakiQuotesLayout extends React.Component {
	render(){
		const {
			children,
			onFetch,
			page="index",
			doMerakiQuotesCreate
		} = this.props
		return (
			<Grid className="MerakiQuotesLayout">
				<div className="Row">
					<Col sm={3}>
						<MerakiQuotesMenu onCreate={doMerakiQuotesCreate}/>
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
		)
	}
}

const select = state => ({})

const actions = {
	doMerakiQuotesCreate
}

export default connect(select, actions)(MerakiQuotesLayout)