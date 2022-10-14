import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query ($author: String, $genre: String){
    allBooks(author: $author, genre: $genre) {
      title
      published
      author
      id
      genres
    }
  }
`

export const ADD_BOOK = gql`
  mutation($title: String!, $published: Int!, $author: String!, $genres: [String]!) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      author
      genres
      id
    }
  }
`