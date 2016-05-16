import React from 'react'
import {connect} from 'react-redux'
import {
	Grid,
	Row,
	Col,
	Panel
} from 'react-bootstrap'
import {doMerakiQuotesCreate} from '../../pages/meraki_quotes/actions/meraki-quotes.actions.js'
import MerakiQuotesMenu from '../menus/meraki-quotes-menu.component.js'
import Breadcrumbs from '../helpers/breadcrumbs.component.js'

class MerakiQuotesLayout extends React.Component {
	render(){
		const { children, doMerakiQuotesCreate, state } = this.props
		return (
			<Grid className="MerakiQuotesLayout">
				<div className="row">
					<Col sm={3}>
						<MerakiQuotesMenu onCreate={doMerakiQuotesCreate}/>
					</Col>

					<Col sm={9}>
						<Row>
							<Col xs={12}>
								<div className="pull-right">
									<Breadcrumbs 
										breadcrumbs={state.breadcrumbs}>
									</Breadcrumbs>
								</div>
							</Col>
						</Row>
						{children}
					</Col>
				</div>

			</Grid>
		)
	}
}

const select = state => ({
	state: state.merakiQuotes
})

const actions = {
	doMerakiQuotesCreate
}

export default connect(select, actions)(MerakiQuotesLayout)