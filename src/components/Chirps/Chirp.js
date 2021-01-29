import React from 'react'

import './Chirp.css'

const Chirp = ({ id, text }) => {

  return (
    <div key={id}>
      <li>{id} -- {text}</li>
    </div>
  )
}

export default Chirp