'use strict'

/* IMPORTS */
import _ from 'lodash'
import moment from 'moment'

/* DEFAULTS */
const defaults = {
	SERVICE_LEVEL_CONSTANTS: {
		'9x5xNBD': {
			admin: 2.030,
			service: 0.4444
		},
		'24x7x4': {
			admin: 3.041,
			service: 1.405
		}
	}
}

/* CONSTRUCTOR */
function SolutionCalcConstructor(){
	///////////////////////////////
	/// PRIVATE METHODS
	///

	const {SERVICE_LEVEL_CONSTANTS} = defaults

	/**
	 * Filter function to get the hardware devices from a Meraki Products collection
	 * @param  {Object} model Meraki product object
	 * @return {Boolean}      Wether the product is hardware or not
	 */
	const isHardware = model => 
		_.isString(model.PartNumber) && model.PartNumber.indexOf('LIC') === -1
	/**
	 * Filter function to get the licenses devices from a Meraki Products collection
	 * @param  {Object} model Meraki product object
	 * @return {Boolean}      Wether the product is a license or not
	 */
	const isLicense = model => 
		_.isString(model.PartNumber) && model.PartNumber.indexOf('LIC') > -1

	/**
	 * Returns all items which PartNumber corresponds to a Meraki Device Hardware
	 * @param  {Collection} devices Collection of Meraki products
	 * @return {Collection}         Collection of Licenses stored in the passed in devices
	 */
	const getHardwareFrom = (devices=[]) => devices.filter(isHardware)

	/**
	 * Returns all items which PartNumber corresponds to a Meraki Device License
	 * @param  {Collection} devices Collection of Meraki products
	 * @return {Collection}         Collection of Licenses stored in the passed in devices
	 */
	const getLicensesFrom = (devices=[]) => devices.filter(isLicense)

	/**
	 * Helper function to get the current modifier for the service or admin value
	 * @param  {String} type  "admin" or "service"
	 * @param  {level} level  Quote Service Level "9x5xNBD" or "24x7x4"
	 * @return {Number}       The value of the modifier
	 */
	const getModifierFor = (type, level) => {
		if (type === "service") return SERVICE_LEVEL_CONSTANTS[level]["service"]
		if (type === "admin")   return SERVICE_LEVEL_CONSTANTS[level]["admin"]
	}
	
	/**
	 * Calculates the number of months give the license years
	 * @param  {Object} license Meraki License object
	 * @return {Number}         Number of months
	 */	
	const getLicenseMonthsFrom = license =>
		license.LicenceYears * 12 /*months*/

	/**
	 * Alias to calculate the service cost of the current quote
	 * @param  {Object} quote Quote object
	 * @return {Number}       The monthly cost of the service
	 */
	const calculateServiceCostOf = (quote) => calculateSupportCostFrom(quote, "service")
	/**
	 * Alias to calculate the administration cost of the current quote
	 * @param  {Object} quote Quote object
	 * @return {Number}       The monthly cost of the administration
	 */
	const calculateAdminCostOf   = (quote) => calculateSupportCostFrom(quote, "admin")

	/**
	 * Helper function that calculates the service or administration costs depending
	 * on the type parameter
	 * @param  {Object} quote Quote object
	 * @param  {String} type  "service" or "admin"
	 * @return {Number}       The monthly administration or service cost
	 */
	const calculateSupportCostFrom = (quote, type) =>
		getLicensesFrom(quote.Devices).reduce((acc, license) => 
			acc + 
			license.Price * 
			license.Qty   *
			getModifierFor(type, quote.ServiceLevel) / 
			getLicenseMonthsFrom(quote)
		, 0)

	const getLogVariableFor = (quote, type, license) => {
		const price = getLogPriceFor(quote, type, license)
		const margin = type === "service" ? quote.ServiceMargin : quote.AdminMargin

		return price * (margin + 0.5) / Math.log(60)
	}

	const getLogPriceFor = (quote, type, license) =>
		license.Price                            *
		getModifierFor(type, quote.ServiceLevel) /
		getLicenseMonthsFrom(quote)              /
		(1 - (type === "service" ? quote.ServiceMargin : quote.AdminMargin))

	/**
	 * Helper function that calculates the log service or administration costs depending
	 * on the type parameter
	 * @param  {Object} quote Quote object
	 * @param  {String} type  "service" or "admin"
	 * @return {Number}       The monthly administration or service cost
	 */
	const calculateSupportLogCostFrom = (quote, type) =>
		getLicensesFrom(quote.Devices).reduce((acc, license) => 
			acc + supportCostLogFor(quote, type, license) * license.Qty
		, 0)

	const supportCostLogFor = (quote, type, license) => {
		const a     = getLogVariableFor(quote, type, license)
		const price = getLogPriceFor(quote, type, license)

		return Math.round((- a * Math.log(license.Qty) + price) * 100) / 100
	}

	/**
	 * Alias function to calculate the cost of all the hardware on the quote.
	 * @param  {Object} quote Quote object
	 * @return {Number}       The cost of all the hardware
	 */
	const calculateHardwareCostFrom = (quote) => calculateCostOf(quote, 'hardware')
	/**
	 * Alias function to calculate the cost of all the licenses on the quote.
	 * @param  {Object} quote Quote object
	 * @return {Number}       The cost of all the licenses
	 */
	const calculateLicenseCostFrom =  (quote) => calculateCostOf(quote, 'licenses')

	/**
	 * Helper function to reduce the costs of the hardware or license, selected depending
	 * on the type argument.
	 * @param  {Object} quote Quote object
	 * @param  {String} type  "admin" or "service"
	 * @return {Number}       The cost of all the licenses or hardware
	 */
	const calculateCostOf = (quote, type) => {
		const collection = type === 'hardware' ? 
			getHardwareFrom(quote.Devices)               :
			getLicensesFrom(quote.Devices)

		return collection.reduce((acc, model) =>
			acc               +
			model.Price       *
			model.Qty         *
			(1 - quote.Discount) *
			(type === 'licenses' ? 1 : (1 + model.Intro))
		, 0)
	}

	/**
	 * Helper function to calculate the hardware total price
	 * @param  {Object} quote Quote object
	 * @return {Number}       Hardware total price
	 */
	const calculateHardwarePrice = (quote) => 
		calculateHardwareCostFrom(quote) / (1 - quote.HardwareMargin)

	/**
	 * Helper function to calculate the financed monthly costs of the hardware
	 * @param  {Object} quote Quote object
	 * @return {Number}       The monthly financed price of all the hardware.
	 */
	const financedHardwarePrice = (quote) =>
		calculateHardwarePrice(quote) * 0.04 
	/**
	 * Helper function to calculate the monthly cost of the licesnses
	 * @param  {Object} quote Quote object
	 * @return {Number}       The monthly cost of the licenses
	 */
	const licenseMonthlyPrice = (quote) =>
		calculateLicenseCostFrom(quote) / (1 - quote.SoftwareMargin) / getLicenseMonthsFrom(quote)
	/**
	 * Helper function to calculate the monthly cost of the service
	 * @param  {Object} quote Quote Object
	 * @return {Number}       The monthly cost of the service
	 */
	const serviceMonthlyPrice = (quote) =>
		calculateServiceCostOf(quote) / (1 - quote.ServiceMargin)
	/**
	 * Helper function to calculate the monthly cost of the administration
	 * @param  {Object} quote Quote Object
	 * @return {Number}       The monthly cost of the administration
	 */
	const adminMonthlyPrice = (quote) =>
		calculateAdminCostOf(quote) / (1 - quote.AdminMargin)
	/**
	 * Helper function to calculate the monthly cost of the service
	 * @param  {Object} quote Quote Object
	 * @return {Number}       The monthly cost of the service
	 */
	const serviceMonthlyLogPrice = (quote) =>
		calculateSupportLogCostFrom(quote, "service")
	/**
	 * Helper function to calculate the monthly cost of the administration
	 * @param  {Object} quote Quote Object
	 * @return {Number}       The monthly cost of the administration
	 */
	const adminMonthlyLogPrice = (quote) =>
		calculateSupportLogCostFrom(quote, "admin")

	/**
	 * Calculates the monthly cost of the Unified Solution
	 * @param  {Object} quote Quote object
	 * @return {Number}       The monthly cost of the Unified solution
	 */
	const calculateUnifiedMonthlyPrice = (quote) =>
		financedHardwarePrice(quote) +
		licenseMonthlyPrice(quote) +
		serviceMonthlyPrice(quote) + 
		adminMonthlyPrice(quote)

	/**
	 * Calculates the monthly cost of the Administered Solution
	 * @param  {Object} quote Quote object
	 * @return {Number}       The monthly cost of the Unified solution
	 */
	const calculateAdministeredMonthlyPrice = (quote) => 
		licenseMonthlyPrice(quote) +
		serviceMonthlyPrice(quote) + 
		adminMonthlyPrice(quote)

	/**
	 * Calculates the monthly cost of the Traditional Solution
	 * @param  {Object} quote Quote object
	 * @return {Number}       The monthly cost of the Unified solution
	 */
	const calculateTraditionalMonthlyPrice = (quote) => 
		licenseMonthlyPrice(quote) +
		serviceMonthlyPrice(quote)

	/**
	 * Calculates the log monthly cost of the Unified Solution
	 * @param  {Object} quote Quote object
	 * @return {Number}       The log monthly cost of the Unified solution
	 */
	const calculateUnifiedMonthlyLogPrice = (quote) =>
		financedHardwarePrice(quote) +
		licenseMonthlyPrice(quote) +
		serviceMonthlyLogPrice(quote) + 
		adminMonthlyLogPrice(quote)

	/**
	 * Calculates the log monthly cost of the Administered Solution
	 * @param  {Object} quote Quote object
	 * @return {Number}       The log monthly cost of the Unified solution
	 */
	const calculateAdministeredMonthlyLogPrice = (quote) => 
		licenseMonthlyPrice(quote) +
		serviceMonthlyLogPrice(quote) + 
		adminMonthlyLogPrice(quote)

	/**
	 * Calculates the log monthly cost of the Traditional Solution
	 * @param  {Object} quote Quote object
	 * @return {Number}       The log monthly cost of the Unified solution
	 */
	const calculateTraditionalMonthlyLogPrice = (quote) => 
		licenseMonthlyPrice(quote) +
		serviceMonthlyLogPrice(quote)

	///////////////////////////////
	/// PLACEHOLDER CONSTRUCTORS
	/// 

	/**
	 * Placeholder object to return from the from() method with the needed methods
	 * @param  {Object} quote Quote object
	 * @return {Object}       Object containing the chained methods associated with the quote.
	 */
	const solutionCalc = (quote, isLogActivated) => {
		return !!isLogActivated ?
			Object.freeze({
				calculateUnifiedMonthlyPrice: calculateUnifiedMonthlyLogPrice.bind(this, quote),
				calculateAdministeredMonthlyPrice: calculateAdministeredMonthlyLogPrice.bind(this, quote),
				calculateTraditionalMonthlyPrice: calculateTraditionalMonthlyLogPrice.bind(this, quote),	
				calculateHardwarePrice: calculateHardwarePrice.bind(this, quote)
			})
			:
			Object.freeze({
				calculateUnifiedMonthlyPrice: calculateUnifiedMonthlyPrice.bind(this, quote),
				calculateAdministeredMonthlyPrice: calculateAdministeredMonthlyPrice.bind(this, quote),
				calculateTraditionalMonthlyPrice: calculateTraditionalMonthlyPrice.bind(this, quote),
				calculateHardwarePrice: calculateHardwarePrice.bind(this, quote)
			})
	}

	///////////////////////////////
	/// PUBLIC METHODS
	/// 

	/**
	 * Placeholder function that returns an object from which you can change the needed methods
	 * to calculate the values of all the different solutions
	 * @param  {Object} quote Quote object
	 * @return {Object}       SolutionCalc object
	 */
	const from = (quote, {isLogActivated}) => {
		return solutionCalc(quote, isLogActivated)
	}

	///////////////////////////////

	return Object.freeze({
		from,
		supportCostLogFor
	})
}
const SolutionCalc = SolutionCalcConstructor()

/* EXPORTS */
export default SolutionCalc