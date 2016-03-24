import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import mainReducer from './main-reducer.js'

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

export const store = createStoreWithMiddleware(mainReducer)