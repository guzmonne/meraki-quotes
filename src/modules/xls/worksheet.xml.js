const WorkSheet = (name, body) => `
	<Worksheet ss:Name="${name}">
		${body}
	</Worksheet>
`

export default WorkSheet