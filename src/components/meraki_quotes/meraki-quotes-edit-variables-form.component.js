import React from 'react'
import {Input, Panel, Button, ButtonGroup} from 'react-bootstrap'

class MerakiQuotesEditVariablesForm extends React.Component {
	constructor(){
		super()
	
		this.submitServiceLevel = this.submitServiceLevel.bind(this)
		this.submitMargin = this.submitMargin.bind(this)
	}

	submitServiceLevel(){
		const ServiceLevel = this.refs.ServiceLevel.getValue()

		this.props.onUpdate({ServiceLevel})
	}

	submitMargin(margin){
		const value = parseInt(this.refs[margin].getValue()) / 100

		this.props.onUpdate({[margin]: value})
	}

	render(){
		const {model={}} = this.props
		return (
			<div>
				<h4>
					<a className="text-info" href="javascript:void(0);">
						<strong>
							Variables
						</strong>
					</a>
				</h4>
				<Panel collapsible expanded={true}>
					<form className="form-horizontal">

						<Input 
							label="Tipo de Servicio"
							labelClassName="col-xs-6"
							wrapperClassName="col-xs-6"
							ref="ServiceLevel"
							type="select"
							onChange={this.submitServiceLevel}
							value={model.ServiceLevel || "9x5xNBD"}
						>
							<option value="9x5xNBD">9x5xNBD</option>
							<option value="24x7x4">24x7x4</option>
						</Input>						
						<Input 
							label="Margen de Hardware"
							labelClassName="col-xs-7"
							wrapperClassName="col-xs-5"
							type="number"
							ref="HardwareMargin"
							onChange={() => this.submitMargin('HardwareMargin')}
							value={(model.HardwareMargin || 0.2) * 100}
							addonAfter={<i className="fa fa-percent"></i>}
						/>						
						<Input 
							label="Margen de Software"
							labelClassName="col-xs-7"
							wrapperClassName="col-xs-5"
							type="number"
							ref="SoftwareMargin"
							onChange={() => this.submitMargin('SoftwareMargin')}
							value={(model.SoftwareMargin || 0.2) * 100}
							addonAfter={<i className="fa fa-percent"></i>}
						/>						
						<Input 
							label="Margen de Servicio"
							labelClassName="col-xs-7"
							wrapperClassName="col-xs-5"
							type="number"
							ref="ServiceMargin"
							onChange={() => this.submitMargin('ServiceMargin')}
							value={(model.ServiceMargin || 0.2) * 100}
							addonAfter={<i className="fa fa-percent"></i>}
						/>						
						<Input 
							label="Margen de Admin."
							labelClassName="col-xs-7"
							wrapperClassName="col-xs-5"
							type="number"
							ref="AdminMargin"
							onChange={() => this.submitMargin('AdminMargin')}
							value={(model.AdminMargin || 0.2) * 100}
							addonAfter={<i className="fa fa-percent"></i>}
						/>
					</form>
				</Panel>
			</div>
		)
	}
}

MerakiQuotesEditVariablesForm.propTypes = {
	model: React.PropTypes.object,
	onUpdate: React.PropTypes.func
}

export default MerakiQuotesEditVariablesForm