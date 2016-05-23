require('./styles/main.scss')

const FileSaver = require('../node_modules/filesaverjs/FileSaver.js')

// Main Application Components
import React from 'react'
import {render} from 'react-dom'
import MainApp from './main.js'
import Base64 from './modules/base64.module.js'
import AwsApiObservers from './modules/aws-api-observers.module.js'

import _ from 'lodash'
import Rx from 'rx-dom'
import moment from 'moment'

window._               = _
window.Rx              = Rx
window.moment          = moment
window.saveAs          = FileSaver.saveAs
window.Base64          = Base64
window.AwsApiObservers = AwsApiObservers

render(<MainApp />, document.getElementById('root'))
