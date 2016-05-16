import React from 'react'
import {Form, FormGroup, FormControl} from 'react-bootstrap'

class PageSizeForm extends React.Component {
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
			<Form className="page-size" onSubmit={this.submit} inline>
				<FormGroup>
					<FormControl 
						componentClass="select"
						onChange={this.submit}
						ref="pageSize"
						placeholder="10"
						className="col-xs-3"
					>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="50">50</option>
						<option value="100">100</option>
						<option value="500">500</option>
						<option value="1000">1000</option>
					</FormControl>
				</FormGroup>
			</Form>
		)
	}
}

PageSizeForm.propTypes = {
	onSelect: React.PropTypes.func
} 

export default PageSizeForm
