import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommendations from './components/Recommendations'
import { BOOK_ADDED, ALL_BOOKS } from './queries'

const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const updateCache = (cache, query, bookAdded) => {
    const uniqByTitle = (a) => {
      let seen = new Set()
      return a.filter((item) => {
        let k = item.title
        return seen.has(k) ? false : seen.add(k)
      })
    }
  
    cache.updateQuery(query, ({ allBooks }) => {
      return {
        allBooks: uniqByTitle(allBooks.concat(bookAdded)),
      }
    })
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const bookAdded = subscriptionData.data.bookAdded
      alert(`New book "${bookAdded.title}" added`)
      updateCache(client.cache, { query: ALL_BOOKS }, bookAdded)
    },
  })

  useEffect(() => {
    setToken(localStorage.getItem('authorization-token'))
  }, [])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>

        {
          token
            ? <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommendations')} >recommendations</button>
              <button onClick={logout}>logout</button>
            </>
            : <button onClick={() => setPage('login')}>login</button>
        }

      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      {
        token
          ? <>
            <NewBook show={page === 'add'} />
            <Recommendations show={page === 'recommendations'} />
          </>
          : null
      }
      {
        token
          ? null
          : <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} />
      }
    </div>
  )
}

export default App
