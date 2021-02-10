import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { GET_CHIRPS } from '../../graphql/queries/index'
import { ADD_CHIRP } from '../../graphql/mutations/index'
import './Form.css'

const Form = () => {
  const [chirp, setChirp] = useState({ text: "", author: "" })
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!chirp.text || !chirp.author) {
      setError("You must enter a name and a chirp")
      return
    }
    addChirp({
      variables: { text: chirp.text, author: chirp.author },
      update: (cache, { data }) => {
        const existingChirps = cache.readQuery({
          query: GET_CHIRPS
        })
        const newChirp = data.insert_chirps.returning[0]
        cache.writeQuery({
          query: GET_CHIRPS,
          data: { chirps: [...existingChirps.chirps, newChirp] }
        })
      },
      onCompleted: setChirp({ text: "", author: "" })
    })
  }

  const [addChirp] = useMutation(ADD_CHIRP)

  return (
    <div className="form-container">
      <h1>New Chirp</h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="new-chirp-form"
      >
        <label htmlFor="author">Name:</label>
        <input
          id="author"
          placeholder="Enter your name here"
          value={chirp.author}
          onChange={(e) => {
            setError("")
            setChirp({ ...chirp, author: e.target.value })
          }
          }
        ></input>
        <label htmlFor="text">Chirp:</label>
        <textarea
          id="text"
          placeholder="Enter your chirp here"
          maxLength="140"
          value={chirp.text}
          onChange={(e) => {
            setError("")
            setChirp({ ...chirp, text: e.target.value })
          }}
        ></textarea>
        <p className="char-total">{`${chirp.text.length} / 140`}</p>
        <button type="submit">Submit</button>
      </form>
      {error && <h2>{error}</h2>}
    </div>
  )
}

export default Form