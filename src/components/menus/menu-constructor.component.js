import React from 'react'
import {Nav, NavItem, Panel} from 'react-bootstrap'
import {browserHistory} from 'react-router'
import _ from 'lodash'

const action = link => {
	if (!link || !link.action) return
	if (_.isFunction(link.action))
		return link.action()
	else if (_.isString(link.action))
		return browserHistory.push(link.action)
}

const MenuConstructor = ({title, className, links=[]}) =>
	<div className={className || null}>
		<h4>{title || "Menu"}</h4>
		<Panel>		
				<Nav bsStyle="pills" stacked>				
					{links.map((link, i) =>
						<NavItem
							eventKey={i}
							key={i}
							onClick={() => action(link)}
						>
							{link.label}
						</NavItem>
					)}
				</Nav>
		</Panel>
	</div>

MenuConstructor.propTypes = {
	className: React.PropTypes.string,
	title: React.PropTypes.string,
	links: React.PropTypes.array.isRequired
}

export default MenuConstructor