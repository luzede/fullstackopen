
import { useDispatch } from "react-redux"

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch({type: 'anecdotes/createAnecdote', payload: content})
    dispatch({type: 'notification/changeNotification', payload: `created '${content}'`})
  }

  return (
    <form onSubmit={create}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
    </form>
  )
}

export default AnecdoteForm