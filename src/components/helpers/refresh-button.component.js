import React from 'react'
import {Button} from 'react-bootstrap'
import Refresher from './refresher.component.js'


export default ({onClick, refreshing, updateText, updatingText, buttonProps}) =>
	<Button 
		onClick={onClick}
		disabled={refreshing}
		{...buttonProps}
	>
		<Refresher 
			refreshing={refreshing}
		/>
		{!refreshing ? 
			` ${updateText || 'Actualizar'}`
			:
			` ${updatingText || 'Actualizar'}`}
	</Button>