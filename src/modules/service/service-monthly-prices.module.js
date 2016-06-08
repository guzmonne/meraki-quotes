import {twoDecimals} from '../formats.module.js' 

import {
	getLicenseMonths
} from './service-helpers.module.js'

import {
	calculateHardwarePrice,
	calculateLicensePrice,
	calculateFinancedHardwarePrice,
	calculateFinancedLicensePrice,
} from './service-prices.module.js'

import {
	calculateServiceCost,
	calculateAdministrationCost
} from './service-costs.module.js'

/**
 * Helper function to calculate the monthly cost of the licesnses
 * @param  {Object} quote Quote object
 * @return {Number}       The monthly cost of the licenses
 */
export const calculateLicenseMonthlyPrice = (quote, options) => {
	const {LicenceYears} = quote
	const licensesPrice  = calculateLicensePrice(quote, options)
	const months         = getLicenseMonths(quote, options)
	const interest       = Math.pow(1.12, LicenceYears)
	const result         = interest * licensesPrice / months
	return twoDecimals(result)
}

/**
 * Calculates the monthly cost of the Unified Solution
 * @param  {Object} quote Quote object
 * @return {Number}       The monthly cost of the Unified solution
 */
export const calculateUnifiedMonthlyPrice = (quote, options) =>
	twoDecimals(
		calculateFinancedHardwarePrice(quote, options) +
		calculateLicenseMonthlyPrice(quote, options) +
		calculateServiceCost(quote, options) + 
		calculateAdministrationCost(quote, options)
	)

/**
 * Calculates the monthly cost of the Administered Solution
 * @param  {Object} quote Quote object
 * @return {Number}       The monthly cost of the Unified solution
 */
export const calculateAdministeredMonthlyPrice = (quote, options) => 
	twoDecimals(
		calculateLicenseMonthlyPrice(quote, options) +
		calculateServiceCost(quote, options) + 
		calculateAdministrationCost(quote, options)
	)

/**
 * Calculates the monthly cost of the Traditional Solution
 * @param  {Object} quote Quote object
 * @return {Number}       The monthly cost of the Unified solution
 */
export const calculateTraditionalMonthlyPrice = (quote, options) => 
	twoDecimals(
		calculateLicenseMonthlyPrice(quote, options) +
		calculateServiceCost(quote, options)
	)