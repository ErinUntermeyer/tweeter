import React from 'react'
import Chirp from './Chirp'
import { useQuery } from '@apollo/client'
import { GET_CHIRPS } from '../../graphql/queries'

import './Chirps.css'

const Chirps = () => {
  const { loading, error, data } = useQuery(GET_CHIRPS)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    console.error(error)
    return <div>Error!</div>
  }

  const makeChirpList = () => {
    return data.chirps.map(chirp => {
      return (
        <Chirp
          key={chirp.id}
          id={chirp.id}
          text={chirp.text}
        />
      )
    })
  }

  return (
    <div>
      <h1>Chirps</h1>
      <ul className="chirps-list">
        {makeChirpList()}
      </ul>
    </div>
  )
}

export default Chirps