import React from 'react'
import {
	Input,
	FormGroup,
	ControlLabel,
	FormControl
} from 'react-bootstrap'
import Rx from 'rx'
import _ from 'lodash'

class InlineSearchForm extends React.Component {
	constructor(){
		super()
	
		this.submit = this.submit.bind(this)
		this.onChangeSubject = new Rx.Subject()
	}

	componentWillMount(){
		this.onChangeObs = this.onChangeSubject.
			filter(x => _.isString(x)).
			map(x => _.isFunction(this.props.transform) ? this.props.transform(x) : x).
			debounce(1000).
			distinctUntilChanged().
			subscribe(this.props.onChange)
	}

	submit(e){
		this.onChangeSubject.onNext(e.target.value)
	}

	render(){
		return (
			<form>
				<FormGroup
					controlId="searchForm"
				>
					<FormControl
						type="text"
						placeholder={this.props.placeholder || 'Buscar...'}
						onChange={this.submit}
					/>
					<FormControl.Feedback>
						<i className="fa fa-search"></i>
					</FormControl.Feedback>
				</FormGroup>
			</form>
		)
	}
}

InlineSearchForm.propTypes = {
	onChange: React.PropTypes.func,
	transform: React.PropTypes.func,
	placeholder: React.PropTypes.string
}

export default InlineSearchForm