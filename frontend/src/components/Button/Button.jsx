import React from 'react'

import './Button.scss'

export default function Button({ type, onClick, variant, label }) {
  return (
    <button type={type} onClick={onClick} className={`button ${variant}`}>
      {label}
    </button>
  )
}
