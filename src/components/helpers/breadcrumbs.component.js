import React from 'react'
import _ from 'lodash'
import {browserHistory} from 'react-router'
import {Breadcrumb, BreadcrumbItem} from 'react-bootstrap'

const onAction = (action) => {
	if (_.isFunction(action))
		return action()
	else if (_.isString(action))
		return browserHistory.push(action)
}

const Breadcrumbs = ({breadcrumbs}) =>
 	<Breadcrumb>
 		{breadcrumbs.map((breadcrumb, i) => 
			<BreadcrumbItem
				key={i}
				onClick={() => onAction(breadcrumb.action)}
				active={i === breadcrumbs.length - 1}
			>
				{breadcrumb.tag}
			</BreadcrumbItem>
 		)}
	</Breadcrumb>

Breadcrumbs.propTypes = {
	breadcrumbs: React.PropTypes.array.isRequired
}

export default Breadcrumbs