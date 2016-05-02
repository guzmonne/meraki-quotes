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
	calculateHardwareCost(quote) / (1 - quote.HardwareMargin)

/**
 * Helper function to calculate the hardware total price
 * @param  {Object} quote Quote object
 * @return {Number}       Hardware total price
 */
export const calculateLicensePrice = (quote) => 
	calculateLicenseCost(quote) / (1 - quote.SoftwareMargin)

export const calculateServicePrice = (quote, options) =>
	calculateServiceCost(quote, options) / (1 - quote.ServiceMargin)

export const calculateAdministrationPrice = (quote, options) =>
	calculateAdministrationCost(quote, options) / (1 - quote.AdminMargin)

/**
 * Helper function to calculate the financed monthly costs of the hardware
 * @param  {Object} quote Quote object
 * @return {Number}       The monthly financed price of all the hardware.
 */
export const calculateFinancedHardwarePrice = (quote) =>
	calculateHardwarePrice(quote) * 0.04
