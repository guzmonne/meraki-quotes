import _ from 'lodash'

import {twoDecimals} from '../formats.module.js'
/* DEFAULTS */
export const SERVICE_LEVEL_CONSTANTS = {
	'9x5xNBD': {
		admin: 2.030,
		service: 0.4444
	},
	'24x7x4': {
		admin: 3.041,
		service: 1.405
	}
}

export const MODIFIER_DISCOUNT = 0.5

export const MODIFIER_MAX_DEVICES = 50 

export const SERVICE_COST_PER_DEVICE = 7
export const SERVICE_MAX_DISCOUNT = 0.5

export const ADMIN_COST = {
	'Wireless': 50,
	'Switches': 50,
	'UTM'     : 200
}
export const ADMIN_MAX_DISCOUNT = 0.70

export const MAX_DEVICES = 50

const LN = Math.log


///////////////////////////////
/// PRIVATE METHODS
///

/**
 * Filter function to get the hardware devices from a Meraki Products collection
 * @param  {Object} model Meraki product object
 * @return {Boolean}      Wether the product is hardware or not
 */
export const isHardware = model => 
	_.isString(model.PartNumber) && model.PartNumber.indexOf('LIC') === -1
/**
 * Filter function to get the licenses devices from a Meraki Products collection
 * @param  {Object} model Meraki product object
 * @return {Boolean}      Wether the product is a license or not
 */
export const isLicense = model => 
	_.isString(model.PartNumber) && model.PartNumber.indexOf('LIC') > -1

/**
 * Returns all items which PartNumber corresponds to a Meraki Device Hardware
 * @param  {Collection} quote   Quote Object
 * @return {Collection}         Collection of Licenses stored in the passed in devices
 */
export const getHardware = (quote) => (quote.Devices || []).filter(isHardware)

/**
 * Returns all items which PartNumber corresponds to a Meraki Device License
 * @param  {Collection} quote   Quote Object
 * @return {Collection}         Collection of Licenses stored in the passed in devices
 */
export const getLicenses = (quote) => (quote.Devices || []).filter(isLicense)

/**
 * Helper function to get the current modifier for the service or admin value
 * @param  {String} type  "admin" or "service"
 * @param  {level} level  Quote Service Level "9x5xNBD" or "24x7x4"
 * @return {Number}       The value of the modifier
 */
export const getModifier = (quote, options, license) => {
	let modifier
	if (_.has(options, 'type') && options.type === "service") modifier = SERVICE_LEVEL_CONSTANTS[quote.ServiceLevel]["service"]
	if (_.has(options, 'type') && options.type === "admin")   modifier = SERVICE_LEVEL_CONSTANTS[quote.ServiceLevel]["admin"]
	if (!modifier) return 0
	if (!!options.isLogActivated)   modifier = calculateLogModifier(modifier, license)
	//console.log(options, modifier)
	return modifier
}

export const calculateLogModifier = (modifier=0, license) =>
	modifier - (modifier * MODIFIER_DISCOUNT / Math.log(MODIFIER_MAX_DEVICES)) * Math.log(license.Qty)

/**
 * Calculates the number of months give the license years
 * @param  {Object} license Meraki License object
 * @return {Number}         Number of months
 */	
export const getLicenseMonths = license =>
	license.LicenceYears * 12 /*months*/

/**
 * Helper function that calculates the service or administration costs depending
 * on the type parameter
 * @param  {Object} quote Quote object
 * @param  {String} type  "service" or "admin"
 * @return {Number}       The monthly administration or service cost
 */
// OLD Exectution -----------
export const calculateSupportCostOld = (quote, options) =>
	getLicenses(quote).reduce((acc, license) => acc + supportCostForLicense(quote, options, license), 0)
// --------------------------
export const calculateSupportCost = (quote, options) => {
	if (!options || !options.type) return 0
	
	if (options.type === 'service') {
		const Qty = getHardware(quote).reduce((acc, device) => acc + device.Qty, 0)
		return twoDecimals(serviceLog(Qty) * Qty)
	} else if (options.type === 'admin'){
		return getHardware(quote).
			filter(hardware => Object.keys(ADMIN_COST).indexOf(hardware.Category) !== -1).
			reduce((acc, hardware) => {
				const {Category, Qty} = hardware
				if (Object.keys(ADMIN_COST).indexOf(Category) === -1) return 0
				const adminLog = log(ADMIN_COST[Category], ADMIN_MAX_DISCOUNT, MAX_DEVICES)
				return acc + twoDecimals(adminLog(Qty) * Qty)
			}, 0)
	} else 
		return 0
}

/**
 * [description]
 * @param  {[type]} init     [description]
 * @param  {[type]} qty      [description]
 * @param  {[type]} discount [description]
 * @param  {[type]} max      [description]
 * @return {[type]}          [description]
 */
export const log = (init, discount, max) =>
	(qty) => Math.round((init - init * discount / LN(max) * LN(qty)) * 10000) / 10000

export const serviceLog = log(SERVICE_COST_PER_DEVICE, SERVICE_MAX_DISCOUNT, MAX_DEVICES)

/**
 * Helper function to calculate the support cost of a given license.
 * @param  {Object} quote   Quote Object
 * @param  {Object} options Options parameters
 * @param  {Object} license License Object
 * @return {Number}         The support 
 */
export const supportCostForLicense = (quote, options, license) => (
	license.Price * 
	license.Qty   *
	getModifier(quote, options, license) / 
	getLicenseMonths(quote)
)

/**
 * Helper function to reduce the costs of the hardware or license, selected depending
 * on the type argument.
 * @param  {Object} quote Quote object
 * @param  {String} type  "admin" or "service"
 * @return {Number}       The cost of all the licenses or hardware
 */
export const calculateDeviceCost = (quote, type) => {
	const collection = type === 'hardware' ? 
		getHardware(quote)                   :
		getLicenses(quote)

	return collection.reduce((acc, device) => acc + deviceCost(quote, type, device), 0)
}

/**
 * Helper function to calculate the device cost depending if it a license or a hardware device.
 * @param  {Object} quote   Quote Object
 * @param  {String} type    Device type
 * @param  {Object} device  Device Object
 * @return {Number}         The support 
 */
export const deviceCost = (quote, type, device) => (
	device.Price         *
	device.Qty           *
	(1 - quote.Discount) *
	(type === 'licenses' ? 1 : (1 + device.Intro))
)