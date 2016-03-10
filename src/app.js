// MDB
require('./styles/bootstrap/css/bootstrap.css');
require('./styles/mdb/css/mdb.css');
// Style Overrides
require('./styles/main.scss');
// Main Application Components
import React from 'react'
import {render} from 'react-dom'
import MainApp from './router.js'

render(<MainApp />, document.getElementById('root'))
