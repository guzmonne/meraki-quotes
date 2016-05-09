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
export const calculateLicenseMonthlyPrice = (quote, options) =>
	twoDecimals(
		calculateLicensePrice(quote, options) / getLicenseMonths(quote, options)
	)

/**
 * Calculates the monthly cost of the Unified Solution
 * @param  {Object} quote Quote object
 * @return {Number}       The monthly cost of the Unified solution
 */
export const calculateUnifiedMonthlyPrice = (quote, options) =>
	twoDecimals(
		calculateFinancedHardwarePrice(quote, options) +
		calculateFinancedLicensePrice(quote, options) +
		calculateServiceCost(quote, options) + 
		calculateAdministrationCost(quote, options)
	)

/**
 * Calculates the monthly cost of the Administered Solution
 * @param  {Object} quote Quote object
 * @return {Number}       The monthly cost of the Unified solution
 */
export const calculateAdministeredMonthlyPrice = (quote, options) => 
	calculateFinancedLicensePrice(quote, options) +
	calculateServiceCost(quote, options) + 
	calculateAdministrationCost(quote, options)

/**
 * Calculates the monthly cost of the Traditional Solution
 * @param  {Object} quote Quote object
 * @return {Number}       The monthly cost of the Unified solution
 */
export const calculateTraditionalMonthlyPrice = (quote, options) => 
	calculateFinancedLicensePrice(quote, options) +
	calculateServiceCost(quote, options)