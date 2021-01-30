import React from 'react'
import { Route } from 'react-router-dom'
import Chirps from '../Chirps/Chirps'
import Form from '../Form/Form'

import './App.css'

const App = () => {
  return (
    <Route exact path="/index" render={() => (
      <div className="app">
        <Form />
        <Chirps />
     </div>
    )} />
  )
}

export default App