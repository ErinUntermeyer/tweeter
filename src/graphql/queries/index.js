import { gql } from '@apollo/client'

export const GET_CHIRPS = gql`
  query getChirps {
    chirps {
      id
      text
      author
      created_at
    }
  }
`