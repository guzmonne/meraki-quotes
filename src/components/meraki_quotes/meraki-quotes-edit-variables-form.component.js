import React from 'react'
import {Input, Panel, Button, ButtonGroup} from 'react-bootstrap'

export default (props) =>
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
					type="select"
					defaultValue="9x5xNBD"
				>
					<option value="9x5xNBD">9x5xNBD</option>
					<option value="24x7x4">24x7x4</option>
				</Input>						
				<Input 
					label="Margen de Hardware"
					labelClassName="col-xs-7"
					wrapperClassName="col-xs-5"
					type="number"
					defaultValue="20"
					addonAfter={<i className="fa fa-percent"></i>}
				/>						
				<Input 
					label="Margen de Software"
					labelClassName="col-xs-7"
					wrapperClassName="col-xs-5"
					type="number"
					defaultValue="20"
					addonAfter={<i className="fa fa-percent"></i>}
				/>						
				<Input 
					label="Margen de Servicio"
					labelClassName="col-xs-7"
					wrapperClassName="col-xs-5"
					type="number"
					defaultValue="20"
					addonAfter={<i className="fa fa-percent"></i>}
				/>						
				<Input 
					label="Margen de Admin."
					labelClassName="col-xs-7"
					wrapperClassName="col-xs-5"
					type="number"
					defaultValue="20"
					addonAfter={<i className="fa fa-percent"></i>}
				/>
				<Input 
					label="Costo de Introducción"
					labelClassName="col-xs-7"
					wrapperClassName="col-xs-5"
					type="number"
					defaultValue="20"
					addonAfter={<i className="fa fa-percent"></i>}
				/>
			</form>
		</Panel>
	</div>