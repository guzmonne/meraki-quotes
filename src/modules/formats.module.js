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