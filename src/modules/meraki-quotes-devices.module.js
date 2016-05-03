import _ from 'lodash'

import Service from './service/service.module.js'

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
export const merakiQuotesDevicesAdd = (quote, model, list, callback) => {
	// If collection is not defined we set it to an array
	_.isArray(quote.Devices) || (quote = Object.assign({}, quote, {Devices: []}))
	// Get only the hardware product numbers
	const hardware = [...Service.from(quote).getHardware(), model].
		reduce(combineMerakiProducts, [])
	// Calculate the software licenses
	const software = calculateNeededLicenses(hardware, quote.LicenceYears, list)
	
	return callback([...hardware, ...software])
}

export const merakiQuotesDevicesRemove = (quote, list, callback) => {
	// If collection is not defined we set it to an array
	_.isArray(quote.Devices) || (quote = Object.assign({}, quote, {Devices: []}))
	// Get only the non-selected hardware
	const hardware = Service.from(quote).getHardware().filter(x => x.selected !== true)
	const software = calculateNeededLicenses(hardware, quote.LicenceYears, list)

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