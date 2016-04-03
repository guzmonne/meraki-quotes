import React from 'react'
import {DropdownButton, MenuItem} from 'react-bootstrap'

export default ({discount, selectAction}) => 
	<DropdownButton title="Lista de Precios" id="Lista de Precios">
	  <MenuItem
	  	active={discount === 1} 
	  	eventKey="1"
	  	onSelect={() => selectAction(1)}>
	  	Standard
		</MenuItem>
	  <MenuItem
	  	active={discount === 1 - 0.35} 
	  	eventKey="2"
	  	onSelect={() => selectAction(1 - 0.35)}>
	  	Partner
		</MenuItem>
	  <MenuItem
	  	active={discount === 1 - 0.43} 
	  	eventKey="3"
	  	onSelect={() => selectAction(1 - 0.43)}> 
	  	Deal Registration
		</MenuItem>
	  <MenuItem
	  	active={discount === 1 - 0.80} 
	  	eventKey="4"
	  	onSelect={() => selectAction(1 - 0.80)}>
	  	NFR
		</MenuItem>
	</DropdownButton>