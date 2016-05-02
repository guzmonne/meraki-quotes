import {
	getLicenseMonths
} from './service-helpers.module.js'

import {
	calculateHardwarePrice,
	calculateLicensePrice,
	calculateServicePrice,
	calculateAdministrationPrice,
	calculateFinancedHardwarePrice,
} from './service-prices.module.js'

/**
 * Helper function to calculate the monthly cost of the licesnses
 * @param  {Object} quote Quote object
 * @return {Number}       The monthly cost of the licenses
 */
export const calculateLicenseMonthlyPrice = (quote, options) =>
	calculateLicensePrice(quote, options) / getLicenseMonths(quote, options)

/**
 * Calculates the monthly cost of the Unified Solution
 * @param  {Object} quote Quote object
 * @return {Number}       The monthly cost of the Unified solution
 */
export const calculateUnifiedMonthlyPrice = (quote, options) =>
	calculateFinancedHardwarePrice(quote, options) +
	calculateLicenseMonthlyPrice(quote, options) +
	calculateServicePrice(quote, options) + 
	calculateAdministrationPrice(quote, options)

/**
 * Calculates the monthly cost of the Administered Solution
 * @param  {Object} quote Quote object
 * @return {Number}       The monthly cost of the Unified solution
 */
export const calculateAdministeredMonthlyPrice = (quote, options) => 
	calculateLicenseMonthlyPrice(quote, options) +
	calculateServicePrice(quote, options) + 
	calculateAdministrationPrice(quote, options)

/**
 * Calculates the monthly cost of the Traditional Solution
 * @param  {Object} quote Quote object
 * @return {Number}       The monthly cost of the Unified solution
 */
export const calculateTraditionalMonthlyPrice = (quote, options) => 
	calculateLicenseMonthlyPrice(quote, options) +
	calculateServicePrice(quote, options)