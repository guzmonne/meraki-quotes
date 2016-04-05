import _ from 'lodash'

const ActionHelpers = (function(){
	/*
		CONSTANTS
	 */

	/*
		PRIVATE METHODS
	 */

	/*
		PUBLIC METHODS
	 */
	const carousel = (array, value, direction=0) => {
		if (!_.isArray(array))
			throw new Error('"array" is not an Array')

		if (!_.isNumber(direction))
			throw new Error('"direc" is not a number')

		const length = array.length

		if (direction !== 0 && direction !== 1 && direction !== -1)
			direction = 0

		if (direction === 0 || length === 0)
			return [...array.slice(0, length - 1), value]
		if (direction === 1)
			return [...array.slice(1), value]
		if (direction === -1)
			return [value, ...array.slice(0, length - 1)]
	}

	return {
		carousel
	}
})()

export default ActionHelpers