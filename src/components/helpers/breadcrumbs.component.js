import React from 'react'
import {Breadcrumb, BreadcrumbItem} from 'react-bootstrap'

const Breadcrumbs = ({breadcrumbs}) =>
 	<Breadcrumb>
 		{breadcrumbs.map((breadcrumb, i) => 
			<BreadcrumbItem key={i} onClick={breadcrumb.action} active={i === breadcrumbs.length - 1}>
				{breadcrumb.tag}
			</BreadcrumbItem>
 		)}
	</Breadcrumb>

Breadcrumbs.propTypes = {
	breadcrumbs: React.PropTypes.array.isRequired
}

export default Breadcrumbs