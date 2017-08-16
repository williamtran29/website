import React from 'react'
import { render } from 'react-dom'
import App from 'client/admin/App'

const main = document.createElement('div')
document.body.appendChild(main)

render(<App />, main)
