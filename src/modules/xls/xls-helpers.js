import lodash from 'lodash'

const {isString, isUndefined, curry} = lodash

const functionDictionary = {
	sum: {
		en     : 'SUM',
		sp     : 'SUMA',
		default: 'SUMA'
	}
}

/**
 * Should return the correct name of the function based on the
 * function name and the required language.
 * @param  {String} functionName Function Name
 * @param  {String} language     Language in only two letters. If empty returns default.
 * @return {String}              The name of the function
 */
export const getFunctionName = (functionName, language) => {
	if (!functionName || !isString(functionName)) return undefined 
	if (Object.keys(functionDictionary).indexOf(functionName) === -1)    return undefined
	if (isUndefined(language) || Object.keys(functionDictionary[functionName]).indexOf(language) === -1) 
		language = 'default'
	return functionDictionary[functionName][language]
}

/**
 * Helper function to get the 'sum' name
 * @param  {String} language Language in only two letters.
 * @return {String}          The name of the sum function
 */
const getSumName = (language) => getFunctionName('sum', language)

/**
 * Returns the name of the SUM function depending on the language
 * @return {String} SUM function name depending on the stored language
 */
export const sum = () => {
	const {localStorage} = window
	if (isUndefined(localStorage))  return getSumName('sum')
	const {excelLanguage} = window.localStorage
	if (isUndefined(excelLanguage)) return getSumName('sum')
	return getSumName(excelLanguage)
}