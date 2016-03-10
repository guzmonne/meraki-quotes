import React from 'react'

export default class Welcome extends React.Component {
	constructor(){
		super()
		this.showLock = this.showLock.bind(this)
	}

	showLock(){
		this.props.lock.show()
	}
		
	render(){
		return (
			<div className="container">
				<div className="col-md-6 col-offset-2">
					<button className="btn btn-primary" onClick={this.showLock}>
						Iniciar sesión
					</button>
				</div>
			</div>		
		)
	}
}