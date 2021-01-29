import React from 'react'
import { Route } from 'react-router-dom'
import Chirps from '../Chirps/Chirps'

import './App.css'

const App = () => {
  return (
    <div className="app">
      <Route exact path='/' render={() => (
        <Chirps />
      )} />
    </div>
  )
}

export default App