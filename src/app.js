require('./styles/main.scss')

// Config AWS
//require('./aws-sdk.import.js')
//import './aws.config.js'
// Main Application Components
import React from 'react'
import {render} from 'react-dom'
import MainApp from './main.js'

import _ from 'lodash'
import Rx from 'rx-dom'
import moment from 'moment'

window._ = _
window.Rx = Rx
window.moment = moment

render(<MainApp />, document.getElementById('root'))
