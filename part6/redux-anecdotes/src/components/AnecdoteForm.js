
import { useDispatch } from "react-redux"
import s from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const anecdote = await s.add({content: content, votes: 0})

    dispatch({type: 'anecdotes/appendAnecdote', payload: anecdote})
    dispatch({type: 'notification/changeNotification', payload: `created '${content}'`})
    dispatch({type: 'notification/changeVisibility', payload: ''})
    setTimeout(() => {
      dispatch({type: 'notification/changeVisibility', payload: 'none'})
    }, 5000)
  }

  return (
    <form onSubmit={create}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
    </form>
  )
}

export default AnecdoteForm