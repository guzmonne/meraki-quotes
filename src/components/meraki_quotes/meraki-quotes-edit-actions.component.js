import React from 'react'

export default ({onRemoveDevice}) =>
	<ul className="list-inline pull-right">
		<li><a className="text-info" href="#"><i className="fa fa-share"></i>{' Compartir'}</a></li>
		<li><a className="text-info" href="#"><i className="fa fa-clone"></i>{' Clonar'}</a></li>
		<li><a className="text-info" href="#"><i className="fa fa-download"></i>{' Descargar'}</a></li>
		<li onClick={onRemoveDevice}>
			<a className="text-primary" href="#"><i className="fa fa-trash"></i>{' Eliminar'}</a>
		</li>
	</ul> 