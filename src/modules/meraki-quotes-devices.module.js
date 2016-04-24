import accounting from 'accounting'
import _ from 'lodash'

/*
CONSTANTS
 */

const moneyOptions = {
	decimal: ',',
	thousand: '.'
}

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

/*
CALCULATION FUNCTIONS
 */

/**
 * Calculates the administration cost given the collection
 * @param  {Collection} collection Meraki products collection
 * @param  {Object} model    Meraki Quote object which contains the needed variables.
 * @param  {String} type     Wether we want the service or administration costs
 * @return {Number}          Administration cost
 */
export function calculateCost(collection, model, type){
	// model must be an Object
	if (!_.isObject(model))
		console.error('"model" must be an object')
	const {Discount, ServiceLevel, LicenceYears} = model || {}
	// Handle the case when model does not have the needed keys.
	if (!Discount || !ServiceLevel)
		console.error('"model.Discount", "model.ServiceLevel" and "model.LicenceYears" must be defined')
	// type variable must be set and must be a string
	// no default is given to force the method call with the appropiate value
	if (!_.isString(type))
		console.error('"type" must be a string')
	// collection variable must be an array
	if (!_.isArray(collection))
		console.error('"collection" must be an array')
	// Get the modifier value from the constants
	const modifier = SERVICE_LEVEL_CONSTANTS[ServiceLevel][type]
	// Reduce the licenses to get the result
	return getLicenses(collection).reduce((acc, license) => {
		// Get Price value from the license
		const {Price, Qty} = license
		// Handle the case when the Price is not defined
		if (!Price) return acc
		// Return the accumulated value
//	return acc + Price * (1 - Discount) * modifier / (LicenceYears * 12 /*months*/)
		return acc + Price * Qty * modifier / (LicenceYears * 12 /*months*/)
	}, 0)
}

/**
 * Calculates the service cost
 * @param  {Collection} collection Meraki Quotes Devices collection
 * @param  {Object} model      Meraki Quote object
 * @return {Number}            The calculated service cost
 */
export function calculateServiceCost(collection, model){
	return calculateCost(collection, model, "service")
}

/**
 * Calculates the administration cost
 * @param  {Collection} collection Meraki Quotes Devices collection
 * @param  {Object} model      Meraki Quote object
 * @return {Number}            The calculated administration cost
 */
export function calculateAdministrationCost(collection, model){
	return calculateCost(collection, model, "admin")
}

/**
 * Calculates the total hardware cost
 * @param  {Collection} collection Meraki Quotes Devices collection
 * @param  {Object}     model      Meraki Quote object
 * @return {Number}            The calculated hardware cost
 */
export const calculateHardwareCost = (collection, model) =>
	calculatePrice(getHardware(collection), {
		Discount: model.Discount,
		Margin: model.HardwareMargin
	})

/**
 * Calculates the total hardware price
 * @param  {Collection} collection Meraki Quotes Devices collection
 * @param  {Object}     model      Meraki Quote object
 * @return {Number}                The calculated hardware price
 */
export const calculateHardwarePrice = (collection, model) =>
	calculateHardwareCost(collection, model) / (1 - model.HardwareMargin)

/**
 * Calculates the software cost
 * @param  {Collection} collection Meraki Quotes Devices collection
 * @param  {Object} model  Meraki Quote object
 * @return {Number}        The calculated software cost
 */
export const calculateSoftwareCost = (collection, model) =>
	calculatePrice(getLicenses(collection), {
		Discount: model.Discount,
		Margin: model.SoftwareMargin
	})

/**
 * Calculates the total cost o a given collection of Meraki Devices
 * @param  {Collection} collection Collection of Meraki Devices Objects
 * @param  {Object} options  Options object with the needed vars for the calculation
 * @return {Number}          The resulting Calculation
 */
function calculatePrice(collection, options){
	// collection must be an array
	if (!_.isArray(collection))
		console.error('"collection" must be an array')
	// options must be an object
	if (!_.isObject(options))
		console.error('"options" must be an object')
	const {Discount, Margin} = options
	// handle invalid option keys
	if (!_.isNumber(Discount) || !_.isNumber(Margin))
		console.error('invalid options')
	// Filter the invalid devices in the collection and then we do the calculation.
	return collection.
		filter(model => 
			!_.isUndefined(model.Price) && !_.isUndefined(model.Qty)
		).
		reduce((acc, model) => 
			acc + model.Price * (1 - Discount) * (1 + (model.Intro || 0)) * model.Qty / (1 - Margin)
		, 0)
}

/**
 * Returns all items which PartNumber corresponds to a Meraki Device License
 * @param  {Collection} collection Collection of Meraki products
 * @return {Collection}            Collection of Licenses stored in the passed in collection
 */
export const getLicenses = collection => {
	// If collection is not an array then we make it one
	_.isArray(collection) || (collection = [])
	return collection.
		filter(model => _.isString(model.PartNumber) && model.PartNumber.indexOf('LIC') > -1)
}

/**
 * Returns all items which PartNumber corresponds to a Meraki Device Hardware
 * @param  {Collection} collection Collection of Meraki products
 * @return {Collection}            Collection of Licenses stored in the passed in collection
 */
export const getHardware = collection => {
	// If collection is not an array then we make it one
	_.isArray(collection) || (collection = [])
	return collection.
		filter(model => _.isString(model.PartNumber) && model.PartNumber.indexOf('LIC') === -1)
}

/*
COLLECTION HANDLER FUNCTIONS
 */

/**
 * Adds a new device to the collection, and recalculates the needed licenses
 * @param  {Collection} collection Current Meraki Devices collection
 * @param  {Model}      model      New Meraki Device to be added to the collection
 * @param  {Number}     years      Number of licence years
 * @param  {Collection} years      Meraki Devices list
 * @param  {Function}   callback   Callback Function to be call after the new device is
 *                                 and the licenses are recalculated
 * @return {Collection}            New Meraki Devices collection
 */
export const merakiQuotesDevicesAdd = (collection, model, years, list, callback) => {
	// If collection is not defined we set it to an array
	_.isArray(collection) || (collection = [])
	// Get only the hardware product numbers
	const hardware = [...getHardware(collection), model].
		reduce(combineMerakiProducts, [])
	// Calculate the software licenses
	const software = calculateNeededLicenses(hardware, years, list)
	
	return callback([...hardware, ...software])
}

export const merakiQuotesDevicesRemove = (collection, years, list, callback) => {
	// If collection is not defined we set it to an array
	_.isArray(collection) || (collection = [])
	// Get only the non-selected hardware
	const hardware = getHardware(collection).filter(x => x.selected !== true)
	const software = calculateNeededLicenses(hardware, years, list)

	return callback([...hardware, ...software])
}

export const calculateNeededLicenses = (hardware, years, list) =>
	hardware.
		map(device => getLicenseFromList(list, device, years)). // From the device get the license
		filter(x => !_.isUndefined(x)).                         // Filter undefined values
		reduce(combineMerakiProducts, [])                       // Reduce multiple licenses into one

const combineMerakiProducts = (acc, x) => {                                          
	const z = acc.find(y => y.PartNumber === x.PartNumber)
	if (!z)
		return [...acc, x]
	else {
		z.Qty = z.Qty + x.Qty
		return acc
	}
}

export const getLicenseFromList = (list, device, years) => {
	const {PartNumber} = device
	let license;
	if (isAP(PartNumber))
		license = list.find(x => x.PartNumber === `LIC-ENT-${years}YR`)
	if (isSwitch(PartNumber))
		license = list.find(x => x.PartNumber === `LIC-${PartNumber.replace('-HW', '')}-${years}YR`)
	if (isUTM(PartNumber))
		license = list.find(x => x.PartNumber === `LIC-${PartNumber.replace('-HW', '')}-SEC-${years}YR`)
	if (isZ1(PartNumber))
		license = list.find(x => x.PartNumber === `LIC-Z1-ENT-${years}YR`)
	if (!!license)
		license = Object.assign({}, license, {Qty: device.Qty})
	return license
}

/*
HELPER FUNCTIONS
 */

/**
 * Helper function to format the money as a currency
 * @param  {Number} value Value to be transformed
 * @return {String}       Parsed value
 */
export function formatMoney(value){
	return accounting.formatMoney(value, moneyOptions)
}

/**
 * Contains constructor to build the necessary device type identifiers
 * @param  {String} string Test string
 * @param  {String} value  Value to test agains the test string
 * @return {Boolean}       Wether the string contains the given value
 */
const contains = (string, value) => value.indexOf(string) > -1
const isAP     = _.curry(contains)('MR')
const isSwitch = _.curry(contains)('MS')
const isUTM    = _.curry(contains)('MX')
const isZ1     = _.curry(contains)('Z1')

/**
 * Calculates the monthly payments necessary for the Unified solution by
 * returning the sum of the finance hardware, licenses, and administration
 * and service costs.
 * @param  {Quote}      quote      Object representing the current quote
 * @return {Number}            		 Unified Solution monthly payment
 */
export const calculateUnifiedSolutionPrice = (quote, isLogActivated) => {
	const {
		Devices,
		HardwareMargin,
		SoftwareMargin,
		AdminMargin,
		ServiceMargin,
		Discount,
		LicenceYears
	} = quote

	if (
		_.isUndefined(Devices)        ||
		_.isUndefined(HardwareMargin) ||
		_.isUndefined(SoftwareMargin) ||
		_.isUndefined(AdminMargin)    ||
		_.isUndefined(ServiceMargin)  ||
		_.isUndefined(Discount)       ||
		_.isUndefined(LicenceYears)
	) return

	const hardware     = getHardware(Devices)
	const software     = getLicenses(Devices)
	const hardwareCost = calculateHardwarePrice(hardware, quote)
	const softwareCost = calculatePrice(software, {Margin: SoftwareMargin, Discount: Discount})
	const adminPrice   = !!isLogActivated ? 
		calculateAdminLogPrice(quote)
		:
		calculateAdministrationCost(Devices, quote) / (1 - AdminMargin)
	const servicePrice  = !!isLogActivated ? 
		calculateServiceLogPrice(quote)
		:
		calculateServiceCost(Devices, quote) / (1 - ServiceMargin)

	return (
		hardwareCost * 0.04 +
		softwareCost / 36   + 
		adminPrice          + 
		servicePrice
	)
}

/**
 * Calculates the monthly price of the "Administered Solution".
 * It takes into account the license, service, and administration costs.
 * @param  {Quote}      quote      Object representing the current quote
 * @return {Number}            		 Administered Solution monthly payment
 */
export const calculateAdminMonthlyPrice = (quote, isLogActivated) => {
	const {
		Devices,
		SoftwareMargin,
		AdminMargin,
		ServiceMargin,
		Discount,
		LicenceYears
	} = quote

	if (
		_.isUndefined(Devices)        ||
		_.isUndefined(SoftwareMargin) ||
		_.isUndefined(AdminMargin)    ||
		_.isUndefined(ServiceMargin)  ||
		_.isUndefined(Discount)       ||
		_.isUndefined(LicenceYears)
	) return

	const software     = getLicenses(Devices)
	const softwareCost = calculatePrice(software, {Margin: SoftwareMargin, Discount: Discount})
	const adminPrice   = !!isLogActivated ? 
		calculateAdminLogPrice(quote)
		:
		calculateAdministrationCost(Devices, quote) / (1 - AdminMargin)
	const servicePrice  = !!isLogActivated ? 
		calculateServiceLogPrice(quote)
		:
		calculateServiceCost(Devices, quote) / (1 - ServiceMargin)
	const months       = LicenceYears * 12

	return (
		softwareCost / months + 
		adminPrice            + 
		servicePrice
	)
} 

/**
 * Calculates the monthly price of the "Traditional Solution".
 * It takes into account the license and service costs.
 * @param  {Quote}      quote      Object representing the current quote
 * @return {Number}            		 Administered Solution monthly payment
 */
export const calculateServiceMonthlyPrice = (quote, isLogActivated) => {
	const {
		Devices,
		SoftwareMargin,
		ServiceMargin,
		Discount,
		LicenceYears
	} = quote
	
	if (
		_.isUndefined(Devices)        ||
		_.isUndefined(SoftwareMargin) ||
		_.isUndefined(ServiceMargin)  ||
		_.isUndefined(Discount)       ||
		_.isUndefined(LicenceYears)
	) return

	const software     = getLicenses(Devices)
	const softwareCost = calculatePrice(software, {Margin: SoftwareMargin, Discount: Discount})
	const servicePrice  = !!isLogActivated ? 
		calculateServiceLogPrice(quote)
		:
		calculateServiceCost(Devices, quote) / (1 - ServiceMargin)
	const months       = LicenceYears * 12

	return (
		softwareCost / months   +
		servicePrice
	)
}

/**
 * Calculates a logaritmicaly reduced price of the service for 
 * given device, using it's associated license.
 * @param  {Object} license Object describing the given license
 * @param  {Object} quote   Object describing the given quote
 * @param  {Number} x       Indicated the quantity of devices for the calculation
 * @return {Number}         The price of providing service for a given ammount of devices.
 */
export const serviceLogPrice = (license, quote, x) => {
	const {ServiceLevel, ServiceMargin, LicenceYears} = quote
	const {Price} = license

	const modifier = SERVICE_LEVEL_CONSTANTS[ServiceLevel]["service"]
	const months = LicenceYears * 12
	const serviceCost = Price * modifier / months
	const servicePrice = serviceCost / (1 - ServiceMargin) 

	const a = servicePrice * (ServiceMargin) / Math.log(60)

	return Math.round((- a * Math.log(x) + servicePrice) * 100) / 100
}

/**
 * Calculates a logaritmicaly reduced price of the administration of a 
 * given device, using it's associated license.
 * @param  {Object} license Object describing the given license
 * @param  {Object} quote   Object describing the given quote
 * @param  {Number} x       Indicated the quantity of devices for the calculation
 * @return {Number}         The price of administering for a given ammount of devices.
 */
export const adminLogPrice = (license, quote, x) => {
	const {ServiceLevel, AdminMargin, LicenceYears} = quote
	const {Price} = license

	const modifier = SERVICE_LEVEL_CONSTANTS[ServiceLevel]["admin"]
	const months = LicenceYears * 12
	const adminCost = Price * modifier / months
	const adminPrice = adminCost / (1 - AdminMargin)

	const a = adminPrice * (AdminMargin) / Math.log(60)

	return Math.round(( -a * Math.log(x) + adminPrice) * 100) / 100
}

export const calculateServiceLogPrice = (quote) => {
	const {Devices} = quote

	if (!Devices) return

	const software = getLicenses(Devices)
	
	const result = software.
		map(license => serviceLogPrice(license, quote, license.Qty) * license.Qty).
		filter(x => !_.isUndefined(x)).
		reduce((acc, x) => acc + x, 0)

	return result
}

export const calculateAdminLogPrice = (quote) => {
	const {Devices} = quote

	if (!quote) return

	const software = getLicenses(Devices)

	const result = software.
		map(license => adminLogPrice(license, quote, license.Qty) * license.Qty).
		filter(x => !_.isUndefined(x)).
		reduce((acc, x) => acc + x, 0)

	return result
}