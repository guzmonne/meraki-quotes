import React from 'react'
import {Row, Col, Input, Button} from 'react-bootstrap'

export default class MerakiQuotesSearchForm extends React.Component {
	render(){
		return (
			<Row className="MerakiQuotesEdit__device_search_form">
				<Col sm={8}>
					<Input 
						type="text"
						placeholder="Buscar equipos por modelo o descripción"
					/>
				</Col>
				<Col sm={2}>
					<Input 
						type="number"
						defaultValue={1}
					/>
				</Col>
				<Col sm={2}>
					<Button block>
						<i className="fa fa-plus"></i>{' Agregar'}
					</Button>
				</Col>
			</Row>
		)
	}
}