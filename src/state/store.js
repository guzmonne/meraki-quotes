import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
//import createLogger from 'redux-logger'
import mainReducer from './main-reducer.js'

//const logger = createLogger()

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
//let createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore)

//export const store = createStoreWithMiddleware(mainReducer)

export const store = createStore(mainReducer, {}, compose(
	applyMiddleware(thunk),
	window.devToolsExtension && process.env.NODE_ENV !== 'production' ? window.devToolsExtension() : f => f
))
