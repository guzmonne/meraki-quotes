import React from 'react'
import {connect} from 'react-redux'
import {
	Grid,
	Row,
	Col,
	Panel
} from 'react-bootstrap'

import UserProfileMenu from '../menus/user-profile-menu.component.js'
import Breadcrumbs from '../helpers/breadcrumbs.component.js'

class UserProfileLayout extends React.Component {
	render(){
		const {children, state} = this.props
	
		return (
			<Grid className="UserProfileLayout">
				<Row>
					<Col sm={3}>
						<UserProfileMenu />
					</Col>
					<Col sm={9}>
						<Row>
							<Col smOffset={6} sm={6} mdOffset={9} md={3}>
								<div className="pull-right">
									<Breadcrumbs 
										breadcrumbs={state.breadcrumbs}
									/>
								</div>
							</Col>
						</Row>
						{children}
					</Col>
				</Row>
			</Grid>
		)
	}
}

const select = state => ({state: state.users})

const actions = {}

export default connect(select, actions)(UserProfileLayout)