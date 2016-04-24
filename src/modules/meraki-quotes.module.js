'use strict'

/* IMPORTS */
import moment from 'moment'
import HelpersModule from './helpers.module.js'

/* DEFAULTS */

/* CONSTRUCTOR */
function MerakiQuotesModule(){
	const {guid} = HelpersModule
	const randomQuote = () => ({
		Name: `${moment(new Date()).format('YYYYMMDD_hh:mm:ss')} - Meraki Quote`,
		Description: guid()
	})

	return Object.freeze({
		randomQuote
	})
}
const MerakiQuotes = MerakiQuotesModule()
const {randomQuote} = MerakiQuotes 

/* EXPORTS */
export default MerakiQuotes
export {randomQuote}