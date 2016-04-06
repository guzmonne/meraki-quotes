import React from 'react'
import {Input} from 'react-bootstrap'

export default class PageSizeForm extends React.Component {
	constructor(){
		super()

		this.submit = this.submit.bind(this)
	}

	submit(){
		const pageSize = parseInt(this.refs.pageSize.getValue())

		this.props.onSelect(pageSize)
	}

	render(){
		return (
			<form className="form-horizontal page-size" onSubmit={this.submit}>
				<Input onChange={this.submit} type="select" labelClassName="col-xs-2" wrapperClassName="col-xs-4" ref="pageSize">
					<option value="10">10</option>
					<option value="50">50</option>
					<option value="100">100</option>
					<option value="500">500</option>
					<option value="1000">1000</option>
				</Input>
			</form>
		)
	}
}