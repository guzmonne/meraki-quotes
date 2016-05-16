import React from 'react'
import MenuConstructor from './menu-constructor.component.js'

const links = [
	{label: 'Cuenta',             action: '/user/account'},
	{label: 'Cambiar contraseña', action: '/user/change_password'},
	{label: 'Permisos',           action: '/user/permissions'}
]

export default () =>
	<MenuConstructor 
		className="UserProfile"
		title="Configuración de Usuario"
		links={links}
	/>