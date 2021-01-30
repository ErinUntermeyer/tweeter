import { gql } from '@apollo/client'

export const ADD_CHIRP = gql`
  mutation addChirp($text: String!, $author: String!) {
    insert_chirps(objects: { text: $text, author: $author }) {
      returning {
        id
        text
        author
        created_at
      }
    }
  }
`

export const UPDATE_CHIRP = gql`
  mutation updateChirp($id: Int!, $text: String!) {
    update_chirps(where: {id: { _eq: $id }}, _set: { text: $text }) {
      returning {
        id
        text
        author
        created_at
      }
    }
  }
`

export const DELETE_CHIRP = gql`
  mutation deleteChirp($id: Int!) {
    delete_chirps(where: { id: { _eq: $id }}) {
      returning {
        id
      }
    }
  }
`