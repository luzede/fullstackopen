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
      author {
        name
        born
        id
        bookCount
      }
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
      author {
        name
        born
        id
        bookCount
      }
      genres
      id
    }
  }
`

export const SET_AUTHORS_BIRTH = gql`
  mutation($born: Int!, $name: String!) {
    editAuthor(born: $born, name: $name) {
      name
      id
      born
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation($username: String!, $password: String!) {
    login (username: $username, password: $password) {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      favouriteGenre
      username
      id
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      author {
        name
        born
        id
        bookCount
      }
      genres
      id
    }
  }
`