require('./styles/bootstrap/css/bootstrap.css');
require('./styles/mdb/css/mdb.css');
require('./styles/main.scss');

import React from 'react'
import {render} from 'react-dom'
import MainApp from './router.js'

render(<MainApp />, document.getElementById('root'))
