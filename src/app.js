require('./styles/main.scss')

require('rx')
require('rx-dom')

// Config AWS
//require('./aws-sdk.import.js')
//import './aws.config.js'
// Main Application Components
import React from 'react'
import {render} from 'react-dom'
import MainApp from './main.js'

import _ from 'lodash'
import Rx from 'rx-dom'

window._ = _
window.Rx = Rx

render(<MainApp />, document.getElementById('root'))
