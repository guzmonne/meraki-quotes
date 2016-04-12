import React from 'react'
import {Input} from 'react-bootstrap'
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

	submit(){
		const queryString = this.refs.queryString.getValue()
		
		this.onChangeSubject.onNext(queryString)
	}

	render(){
		return (
			<Input 
				type="text"
				placeholder={this.props.placeholder || "Buscar..."}
				hasFeedback
				feedbackIcon={<i className="fa fa-search"></i>}
				onChange={this.submit}
				ref="queryString"
			/>
		)
	}
}

InlineSearchForm.propTypes = {
	onChange: React.PropTypes.func,
	transform: React.PropTypes.func,
	placeholder: React.PropTypes.string
}

export default InlineSearchForm