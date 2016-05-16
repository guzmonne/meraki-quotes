require('./styles/main.scss')

const FileSaver = require('../node_modules/filesaverjs/FileSaver.js')
// Config AWS
//require('./aws-sdk.import.js')
//import './aws.config.js'
// Main Application Components
import React from 'react'
import {render} from 'react-dom'
import MainApp from './main.js'
import Base64 from './modules/base64.module.js'

import _ from 'lodash'
import Rx from 'rx-dom'
import moment from 'moment'

window._ = _
window.Rx = Rx
window.moment = moment
window.saveAs = FileSaver.saveAs
window.Base64 = Base64

render(<MainApp />, document.getElementById('root'))
