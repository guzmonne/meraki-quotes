import React from 'react'
import {
	Modal,
	Input,
	Button
} from 'react-bootstrap'

class MerakiQuotesCreateModal extends React.Component {
	constructor(){
		super()
		
		this.submit = this.submit.bind(this)
	}

	submit(){
		const model = {
			Name: this.refs.Name.getValue(),
			Description: this.refs.Description.getValue()
		}

		if (!model.Name || model.Name === "") return
		//if (!model.Description) return

		this.props.onSubmit(model)
	}

	render(){
		const {show, onToggle, title} = this.props
		let {model={}} = this.props

		return (
			<Modal
				show={show}
				onHide={onToggle}
			>
				<Modal.Header closeButton>
					<Modal.Title>{title || 'Meraki - Nuevo Quote'}</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<form>
						<Input 
							defaultValue={model.Name || ""}
							ref="Name"
							type="text"
							label="Nombre"
							placeholder="Nombre"
						/>
						<Input 
							defaultValue={model.Description || ""}
							ref="Description"
							type="text"
							label="Descripción"
							placeholder="Descripción"
						/>
					</form>
				</Modal.Body>

				<Modal.Footer>
					<Button onClick={this.submit}>
						Aceptar
					</Button>
				</Modal.Footer>
			</Modal>
		)
	}
}

MerakiQuotesCreateModal.propTypes = {
	show: React.PropTypes.bool,
	onToggle: React.PropTypes.func,
	onSubmit: React.PropTypes.func,
	model: React.PropTypes.object,
	title: React.PropTypes.string
}

export default MerakiQuotesCreateModal