/* DEFAULTS */
const SERVICE_LEVEL_CONSTANTS = {
	'9x5xNBD': {
		admin: 2.030,
		service: 0.4444
	},
	'24x7x4': {
		admin: 3.041,
		service: 1.405
	}
}

const MODIFIER_DISCOUNT = 0.5

const MODIFIER_MAX_DEVICES = 50 

///////////////////////////////
/// PRIVATE METHODS
///

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
const getModifier = (quote, options, license) => {
	let modifier
	if (options.type === "service") modifier = SERVICE_LEVEL_CONSTANTS[quote.ServiceLevel]["service"]
	if (options.type === "admin")   modifier = SERVICE_LEVEL_CONSTANTS[quote.ServiceLevel]["admin"]
	if (!modifier) return 0
	if (!!options.isLogActivated)   modifier = modifier - (modifier * MODIFIER_DISCOUNT / Math.log(MODIFIER_MAX_DEVICES)) * Math.log(license.Qty)
	//console.log(options, modifier)
	return modifier
}

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
export const calculateSupportCost = (quote, options) =>
	getLicenses(quote).reduce((acc, license) => acc + supportCostForLicense(quote, options, license), 0)

const supportCostForLicense = (quote, options, license) => (
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

const deviceCost = (quote, type, device) => (
	device.Price         *
	device.Qty           *
	(1 - quote.Discount) *
	(type === 'licenses' ? 1 : (1 + device.Intro))
)