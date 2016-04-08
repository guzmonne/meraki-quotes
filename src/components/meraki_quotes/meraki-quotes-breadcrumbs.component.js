import React from 'react'
import {browserHistory} from 'react-router'
import {Breadcrumb, BreadcrumbItem} from 'react-bootstrap'

const breadcrumbs = {}

breadcrumbs.index = () =>
 	<Breadcrumb>
		<BreadcrumbItem onClick={() => browserHistory.push('/')} >
			Home
		</BreadcrumbItem>
		<BreadcrumbItem active>
			Meraki Quotes
		</BreadcrumbItem>
	</Breadcrumb>

export default (props) => breadcrumbs[props.page](props) || <Breadcrumb></Breadcrumb>