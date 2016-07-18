'use strict'

/* IMPORTS */
import _ from 'lodash'
import moment from 'moment'

import {
	getHardware,
	getLicenses
} from './service-helpers.module.js'

import {
	calculateServiceCost,
	calculateAdministrationCost,
	calculateHardwareCost,
	calculateLicenseCost,
} from './service-costs.module.js'

import {
	calculateHardwarePrice,
	calculateLicensePrice,
	calculateServicePrice,
	calculateAdministrationPrice,
	calculateFinancedHardwarePrice,
} from './service-prices.module.js'

import {
	calculateLicenseMonthlyPrice,
	calculateUnifiedMonthlyPrice,
	calculateAdministeredMonthlyPrice,
	calculateTraditionalMonthlyPrice,
} from './service-monthly-prices.module.js'

/* CONSTRUCTOR */
function ServiceConstructor(){
	///////////////////////////////
	/// PRIVATE METHODS
	///

	///////////////////////////////
	/// PLACEHOLDER CONSTRUCTORS
	/// 

	const service = (quote, options) => Object.freeze({
		getHardware                      : getHardware.bind(this, quote, options),
		getLicenses                      : getLicenses.bind(this, quote, options),
		calculateHardwareCost            : calculateHardwareCost.bind(this, quote, options),
		calculateHardwarePrice           : calculateHardwarePrice.bind(this, quote, options),
		calculateLicenseCost             : calculateLicenseCost.bind(this, quote, options),
		calculateLicensePrice            : calculateLicensePrice.bind(this, quote, options),
		calculateLicenseMonthlyPrice     : calculateLicenseMonthlyPrice.bind(this, quote, options),
		calculateUnifiedMonthlyPrice     : calculateUnifiedMonthlyPrice.bind(this, quote, options),
		calculateAdministeredMonthlyPrice: calculateAdministeredMonthlyPrice.bind(this, quote, options),
		calculateTraditionalMonthlyPrice : calculateTraditionalMonthlyPrice.bind(this, quote, options),
		calculateServiceCost             : calculateServiceCost.bind(this, quote, options),
		calculateServicePrice            : calculateServicePrice.bind(this, quote, options),
		calculateAdministrationCost      : calculateAdministrationCost.bind(this, quote, options),
		calculateAdministrationPrice     : calculateAdministrationPrice.bind(this, quote, options),
		calculateFinancedHardwarePrice   : calculateFinancedHardwarePrice.bind(this, quote, options),
	})

	///////////////////////////////
	/// PUBLIC METHODS
	/// 
	
	/**
	 * Placeholder function that returns an object from which you can change the needed methods
	 * to calculate the values of all the different solutions
	 * @param  {Object} quote Quote object
	 * @return {Object}       Service object
	 */
	const from = (quote, options) => {
		return service(quote, options)
	}

	///////////////////////////////

	return Object.freeze({
		from
	})
}
const Service = ServiceConstructor()

/* EXPORTS */
export default Service