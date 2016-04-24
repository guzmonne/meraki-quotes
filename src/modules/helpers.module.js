'use strict'

/* IMPORTS */

/* DEFAULTS */

/* CONSTRUCTOR */
function HelpersModule(){
	const s4 = () => {
		return Math.floor((1 + Math.random()) * 0x10000).
			toString().
			substring(1)	
	}

	const guid = () => {
		return 	s4() + 
						s4() + 
						'-'  + 
						s4() + 
						'-'  + 
						s4() + 
						'-'  +
						s4() + 
						'-'  + 
						s4() + 
						s4() + 
						s4()
	}

	return Object.freeze({
		guid
	})
}

/* EXPORTS */
export default HelpersModule()
