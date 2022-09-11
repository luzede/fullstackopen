import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state.sort((a1, a2) => a2.votes - a1.votes))
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    const anecdote = anecdotes.find(a => a.id === id)
    const newAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const newAnecdotes = anecdotes.map(a => a.id !== id ? a : newAnecdote)
    dispatch({
      type: 'VOTE',
      data: newAnecdotes
    })
  }

  const create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    dispatch({
      type: 'CREATE',
      data: {
        content
      }
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App