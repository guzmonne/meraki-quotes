import React from 'react'

export default ({page=0, pageSize=10, total=10, count=10, queryString=""}) =>
	<div className="text-center index-count">
		<p>
			{(page * pageSize) + 1} 
			{' al '}
			{(page + 1) * pageSize > total ? total : (page + 1) * pageSize}
			{' de '}
			{queryString === "" ? total : count}
		</p>
	</div>