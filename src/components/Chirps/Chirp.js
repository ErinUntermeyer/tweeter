import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { GET_CHIRPS } from '../../graphql/queries/index'
import { UPDATE_CHIRP, DELETE_CHIRP } from '../../graphql/mutations/index'

import './Chirp.css'

const Chirp = ({ id, text, author, created_at }) => {
  const [ editMode, setEditMode ] = useState(false)

  let inputText

  const handleEdit = (e, input) => {
    e.preventDefault()
    updateChirp({
      variables: { id: id, text: input},
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

  const [ updateChirp ] = useMutation(UPDATE_CHIRP)

  const handleDelete = (e) => {
    deleteChirp({
      variables: { id: id },
      optimisticResponse: true,
      update: (cache) => {
        cache.modify({
          fields: {
            chirps(existingChirps, { readField }) {
              return existingChirps.filter(chirp => readField('id', chirp) !== id)
            }
          }
        })
      }
    })
  }

  const [ deleteChirp ] = useMutation(DELETE_CHIRP)
  
  return (
    <article className="chirp-container" key={id}>
      <div className="author-info">
        <p className="author-name">{author} says:</p>
      </div>

      { !editMode ?
        <p className="chirp-text">{text}</p> :
        <div className="chirp-text">
          <label htmlFor="edit-chirp"></label>
          <textarea
            id="edit-chirp"
            placeholder="Edit chirp here!"
            maxLength="140"
            ref={node => {
              inputText = node
            }}
          ></textarea>
          <button
            onClick={(e) => handleEdit(e, inputText.value)}
          >Change!</button>
        </div>
      }

      <div className="buttons">
        <button
          onClick={(e) => !editMode ? setEditMode(true) : setEditMode(false)}
        >
          Edit
        </button>
        <button onClick={(e) => handleDelete(e)}>Delete</button>
      </div>
    </article>
  )
}

export default Chirp