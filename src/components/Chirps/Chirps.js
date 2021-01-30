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
    if (!data.chirps.length) {
      return (<p>You have no chirps!</p>)
    } else {
      return data.chirps.map(chirp => {
        return (
          <Chirp
            key={chirp.id}
            id={chirp.id}
            text={chirp.text}
            author={chirp.author}
            created_at={chirp.created_at}
          />
        )
      })
    }
  }

  return (
    <div className="chirps-container">
      <h1>Chirps</h1>
      <div className="chirps-list">
        {makeChirpList()}
      </div>
    </div>
  )
}

export default Chirps