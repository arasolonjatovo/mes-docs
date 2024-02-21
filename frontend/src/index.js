import React from 'react'
import ReactDOM from 'react-dom/client'

import './style/main.scss'

import CreatePrescription from './pages/CreatePrescription/CreatePrescription'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <CreatePrescription />
  </React.StrictMode>
)
