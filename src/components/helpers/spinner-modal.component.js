import React from 'react'
import {Modal} from 'react-bootstrap'
import Spinner from './spinner.component.js'

export default ({loading}) =>
	<Modal dialogClassName="SpinnerModal" bsSize="sm" show={loading}>
		<Modal.Body>
			<h1 className="text-center"><Spinner/></h1>
		</Modal.Body>
	</Modal>