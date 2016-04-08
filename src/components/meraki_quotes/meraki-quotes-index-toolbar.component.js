import React from 'react'
import {ButtonToolbar, ButtonGroup, Button} from 'react-bootstrap'

export default ({onCreate}) =>
	<ButtonToolbar>
		<ButtonGroup>
			<Button onClick={onCreate}>
				<i className="fa fa-plus"></i>{' Nuevo Quote'}
			</Button>
		</ButtonGroup>
	</ButtonToolbar>