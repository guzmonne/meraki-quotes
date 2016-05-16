import React from 'react'
import {
	Grid,
	Row,
	Col,
	Panel
} from 'react-bootstrap'

const SidePanel = ({className, title, children}) =>
	<Panel className={
		[className, 'SidePanel'].
			filter(x => x !== "" || x !== undefined).
			join(' ')}
		>
		<Row>
			<Col xs={12}>
				<h4>{title}</h4>
			</Col>
		</Row>
		<Row>
			{children}
		</Row>
	</Panel>

SidePanel.propTypes = {
	className: React.PropTypes.string,
	title: React.PropTypes.string
}

export default SidePanel