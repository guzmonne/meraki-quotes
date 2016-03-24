import React from 'react'

export default (props) => 
	<div className="row">
		<div className="col-xs-12">
			<h1>Welcome</h1>
			<br/>
			<a href="/login" className="btn btn-primary" onClick={logout}>
				Cerrar Sesión
			</a>
		</div>
	</div>

function logout(){
	delete localStorage.token;
}