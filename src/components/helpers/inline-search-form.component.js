import React from 'react'
import {Input} from 'react-bootstrap'
import Rx from 'rx'
import _ from 'lodash'

export default class IlineSearchForm extends React.Component {
	constructor(){
		super()
	
		this.submit = this.submit.bind(this)
		this.onChangeSubject = new Rx.Subject()
	}

	componentWillMount(){
		this.onChangeObs = this.onChangeSubject.
			filter(x => _.isString(x)).
			map(x => x.toUpperCase()).
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
				placeholder="Buscar..."
				hasFeedback
				feedbackIcon={<i className="fa fa-search"></i>}
				onChange={this.submit}
				ref="queryString"
			/>
		)
	}
}