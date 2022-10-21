import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { setContext } from '@apollo/client/link/context'

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
  gql
} from '@apollo/client'


const query = gql`
  query {
    allBooks {
      title,
      published,
      author {
        name
        id
        born
        bookCount
      },
      id,
      genres,
    },

    allAuthors {
      name,
      born,
      id,
      bookCount
    }
  }
`
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('authorization-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null
    }
  }
})

const httpLink = new HttpLink({
  uri: 'http://localhost:4000'
})


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

client.query({ query })
  .then((response) => {
    console.log(response.data)
  })

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client} >
    <App />
  </ApolloProvider>
)
