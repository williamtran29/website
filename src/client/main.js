import 'grommet/scss/vanilla/index.scss'

import React from 'react'
import ReactDOM from 'react-dom'

import Router from './Router'

const main = document.createElement('div')
document.body.append(main)
ReactDOM.render(<Router />, main)
