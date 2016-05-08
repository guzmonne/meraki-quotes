import accounting from 'accounting'

/*
CONSTANTS
 */

const moneyOptions = {
	decimal: ',',
	thousand: '.'
}

/**
 * Helper function to format the money as a currency
 * @param  {Number} value Value to be transformed
 * @return {String}       Parsed value
 */
export function formatMoney(value){
	return accounting.formatMoney(value, moneyOptions)
}

/**
 * Returns the original value but only with two decimal places.
 * @param  {Number} value Target value
 * @return {Number}       Target value with only two decimal places
 */
export function twoDecimals(value){
	return Math.round(value * 100) / 100
}