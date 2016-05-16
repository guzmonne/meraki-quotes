import _ from 'lodash'
import {createStore} from 'redux'
import mainReducer from '../../state/main-reducer.js'

const defaultState = {
	merakiQuotes: {}
}

const defaultReducer = state => Object.assign({}, defaultState, state) 

export const falseStore = (reducer) => {
	const store = createStore(mainReducer, {})
	return store
}