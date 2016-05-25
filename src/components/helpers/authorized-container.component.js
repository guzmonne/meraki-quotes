import React from 'react'
import _ from 'lodash'

class AuthorizedContainer extends React.Component {
	render(){
		const {user, permission, children} = this.props
		console.log(user.permissions.indexOf(permission))
		if(!user)                         return null
		if(!_.isArray(user.permissions)) return null
		if(user.permissions.indexOf(permission) > -1)
			return children
		else
			return null
	}
}

AuthorizedContainer.propTypes = {
	user      : React.PropTypes.object,
	permission: React.PropTypes.string
}

export default AuthorizedContainer