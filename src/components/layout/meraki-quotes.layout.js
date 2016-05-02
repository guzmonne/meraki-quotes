import React from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {
	Grid,
	Row,
	Col,
	Panel
} from 'react-bootstrap'
import MerakiQuotesMenu from '../menus/meraki-quotes-menu.component.js'
import Breadcrumbs from '../helpers/breadcrumbs.component.js'

class MerakiQuotesLayout extends React.Component {
	render(){
		const { children } = this.props
		return (
			<Grid className="MerakiQuotesLayout">
				<div className="Row">
					<Col sm={3}>
						<MerakiQuotesMenu onCreate={doMerakiQuotesCreate}/>
					</Col>

					<Col sm={9}>
						<Row>
							<Col smOffset={9} sm={3}>
								<Breadcrumbs 
									breadcrumbs={state.breadcrumbs}>
								</Breadcrumbs>
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

const actions = {}

export default connect(select, actions)(MerakiQuotesLayout)