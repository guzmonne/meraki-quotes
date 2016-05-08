import {
	calculateServiceCost,
	calculateAdministrationCost,
	calculateHardwareCost,
	calculateLicenseCost,
} from './service-costs.module.js'

/**
 * Helper function to calculate the hardware total price
 * @param  {Object} quote Quote object
 * @return {Number}       Hardware total price
 */
export const calculateHardwarePrice = (quote) => 
	Math.round((calculateHardwareCost(quote) / (1 - quote.HardwareMargin)) * 100) / 100

/**
 * Helper function to calculate the hardware total price
 * @param  {Object} quote Quote object
 * @return {Number}       Hardware total price
 */
export const calculateLicensePrice = (quote) => 
	Math.round((calculateLicenseCost(quote) / (1 - quote.SoftwareMargin)) * 100) / 100

export const calculateServicePrice = (quote, options) =>
	Math.round((calculateServiceCost(quote, options) / (1 - quote.ServiceMargin)) * 100) / 100

export const calculateAdministrationPrice = (quote, options) =>
	Math.round((calculateAdministrationCost(quote, options) / (1 - quote.AdminMargin)) * 100) / 100

/**
 * Helper function to calculate the financed monthly costs of the hardware
 * @param  {Object} quote Quote object
 * @return {Number}       The monthly financed price of all the hardware.
 */
export const calculateFinancedHardwarePrice = (quote) =>
	Math.round((calculateHardwarePrice(quote) * 0.04) * 100) / 100
