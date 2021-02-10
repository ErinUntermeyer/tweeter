import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { DELETE_CHIRP, EDIT_CHIRP } from '../../graphql/mutations/index'

import './Chirp.css'
import { GET_CHIRPS } from '../../graphql/queries'

const Chirp = ({ id, text }) => {
  const [ editMode, setEditMode ] = useState(false)
  let input

  const handleDelete = (e) => {
    deleteChirp({
      variables: { id: id },
      update: (cache) => {
        cache.modify({
          fields: {
            chirps(butt, { readField }) {
              return butt.filter(chirp => id !== readField('id', chirp))
            }
          }
        })
      }
    })
  }

  const [ deleteChirp ] = useMutation(DELETE_CHIRP)

  const handleEdit = (e, input) => {
    e.preventDefault()
    editChirp({
      variables: { id: id, text: input },
      optimisticResponse: true,
      update: (cache) => {
        const existingChirps = cache.readQuery({
          query: GET_CHIRPS
        })
        const newChirps = existingChirps.chirps.map(chirp => {
          if (chirp.id === id) {
            return {...chirp, text: chirp.text}
          } else {
            return chirp
          }
        })
        cache.writeQuery({
          query: GET_CHIRPS,
          data: { chirps: newChirps }
        })
      },
      onCompleted: setEditMode(false)
    })
  }

  const [ editChirp ] = useMutation(EDIT_CHIRP)

  return (
    <article className="chirp-container" key={id}>
      <p className="chirp-text">{text}</p>
      <button
        onClick={(e) => handleDelete(e)}
      >
        delete
      </button>
      <button
        onClick={(e) => {
          return !editMode ? setEditMode(true) : setEditMode(false)
        }}
      >
        edit
      </button>

      { editMode && 
        <>
          <input
            ref={node => {
              input = node
            }}
          ></input>
          <button
          onClick={(e) => handleEdit(e, input.value)}
          >submit edit</button>
        </>
      }
    </article>
  )
}

export default Chirp