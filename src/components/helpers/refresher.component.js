import React from 'react'

export default ({refreshing}) =>
	<i 
		className={!!refreshing ? "fa fa-refresh fa-spin" : "fa fa-refresh"}>
	</i>