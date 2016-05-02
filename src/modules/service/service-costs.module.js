import {
	calculateSupportCost,
	calculateDeviceCost
} from './service-helpers.module.js'

/**
 * Alias to calculate the service cost of the current quote
 * @param  {Object} quote Quote object
 * @return {Number}       The monthly cost of the service
 */
export const calculateServiceCost = (quote, options) => calculateSupportCost(quote, Object.assign({}, options, {type: 'service'}))

/**
 * Alias to calculate the administration cost of the current quote
 * @param  {Object} quote Quote object
 * @return {Number}       The monthly cost of the administration
 */
export const calculateAdministrationCost = (quote, options) => calculateSupportCost(quote, Object.assign({}, options, {type: 'admin'}))

/**
 * Alias function to calculate the cost of all the hardware on the quote.
 * @param  {Object} quote Quote object
 * @return {Number}       The cost of all the hardware
 */
export const calculateHardwareCost = (quote) => calculateDeviceCost(quote, 'hardware')
/**
 * Alias function to calculate the cost of all the licenses on the quote.
 * @param  {Object} quote Quote object
 * @return {Number}       The cost of all the licenses
 */
export const calculateLicenseCost =  (quote) => calculateDeviceCost(quote, 'licenses')