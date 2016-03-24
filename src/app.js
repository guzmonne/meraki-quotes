require('./styles/main.scss');
// Config AWS
import './aws.config.js'
// Main Application Components
import React from 'react'
import {render} from 'react-dom'
import MainApp from './main.js'

render(<MainApp />, document.getElementById('root'))
