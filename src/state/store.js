import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
//import createLogger from 'redux-logger'
import mainReducer from './main-reducer.js'

//const logger = createLogger()

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
//let createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore)

export const store = createStoreWithMiddleware(mainReducer)