import React from 'react'
import {
	Modal, 
	Button,
	FormGroup,
	FormControl,
	ControlLabel
} from 'react-bootstrap'

export default class MerakiDeviceCreateModal extends React.Component {
	constructor(){
		super()

		this.state  = {model: {}}
		this.submit = this.submit.bind(this)
		this.change = this.change.bind(this)
	}

	componentWillReceiveProps(newProps){
		if (newProps.model)
			this.setState({model: newProps.model})
	}

	change(value, key){
		this.setState({model: Object.assign({}, this.state.model, {[key]: value})})
	}

	submit(){
		const model = this.state.model

		model.Price = +model.Price

		if (!model.PartNumber) return
		if (!model.Category || model.Category === "") return

		this.props.onSubmit(model)

		this.setState({model: {}})
	}

	render(){
		const {onShow, onToggle} = this.props
		const {model} = this.state

		return (
			<Modal
				show={onShow}
				onHide={onToggle}
			>
				<Modal.Header closeButton>
					<Modal.Title>Meraki - Nuevo Producto</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<form>
						<FormGroup>
							<ControlLabel>Número de Parte</ControlLabel>
							<FormControl 
								type="text"
								value={model.PartNumber}
								placeholder="Número de Parte"
								onChange={(e) => this.change(e.target.value, 'PartNumber')}
							/>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Descripción</ControlLabel>
							<FormControl 
								componentClass="select"
								value={model.Category}
								onChange={(e) => this.change(e.target.value, 'Category')}
							>
								<option value="">--seleccione una categoría--</option>
								<option value="Wireless">Wireless</option>
								<option value="Switches">Switches</option>
								<option value="UTM">UTM</option>
								<option value="Accesories">Accesories</option>
							</FormControl>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Descripción</ControlLabel>
							<FormControl 
								type="text"
								value={model.Description}
								placeholder="Descripción"
								onChange={(e) => this.change(e.target.value, 'Description')}
							/>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Descripción</ControlLabel>
							<FormControl 
								type="number"
								min={0}
								step={0.5}
								value={model.Price}
								placeholder="0.00"
								onChange={(e) => this.change(e.target.value, 'Price')}
							/>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Imagen</ControlLabel>
							<FormControl 
								type="text"
								min={0}
								step={0.50}
								value={model.ImageUrl}
								placeholder="Ej.:http://placehold.it/50x50"
								onChange={(e) => this.change(e.target.value, 'ImageUrl')}
							/>
						</FormGroup>
					</form>
				</Modal.Body>

				<Modal.Footer>
					<Button onClick={this.submit}>Aceptar</Button>
				</Modal.Footer>

			</Modal>
		)
	}
}