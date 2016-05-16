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
							<Col smOffset={9} sm={3}>
								<Breadcrumbs 
									breadcrumbs={state.breadcrumbs}
								/>
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