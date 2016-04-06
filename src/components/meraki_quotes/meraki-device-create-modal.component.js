import React from 'react'
import {Modal, Input, Button} from 'react-bootstrap'

export default class MerakiDeviceCreateModal extends React.Component {
	constructor(){
		super()

		this.submit = this.submit.bind(this)
	}

	submit(){
		const model = {
			PartNumber  : this.refs.PartNumber.getValue().toUpperCase(),
			Category    : this.refs.Category.getValue(),
			Description : this.refs.Description.getValue(),
			Price       : +this.refs.Price.getValue(),
			ImageUrl    : this.refs.ImageUrl.getValue()
		}

		if (!model.PartNumber) return
		if (!model.Category || model.Category === "") return

		this.props.onSubmit(model)
	}

	render(){
		const {onShow, onToggle} = this.props
		let {model} = this.props

		if (!model) model = {}

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
						<Input defaultValue={model.PartNumber || ""} ref="PartNumber" type="text" label="Número de Parte" placeholder="Número de Parte" />
						<Input defaultValue={model.Category || ""}ref="Category" type="select" label="Categoría" >
							<option value="">--seleccione una categoría--</option>
							<option value="Wireless">Wireless</option>
							<option value="Switches">Switches</option>
							<option value="UTM">UTM</option>
							<option value="Accesories">Accesories</option>
						</Input>
						<Input defaultValue={model.Description || ""} ref="Description" type="text" label="Descripción" placeholder="Descripción" />
						<Input defaultValue={model.Price || 0}ref="Price" type="number" label="Precio" />
						<Input defaultValue={model.ImageUrl || 'http://placehold.it/64x48'}ref="ImageUrl" type="url" label="Imagen" placeholder="Ej.:http://placehold.it/50x50"></Input>
					</form>
				</Modal.Body>

				<Modal.Footer>
					<Button onClick={this.submit}>Aceptar</Button>
				</Modal.Footer>

			</Modal>
		)
	}
}