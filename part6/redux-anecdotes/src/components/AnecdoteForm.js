
import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(createAnecdote(content))
    dispatch(setNotification(`created '${content}'`, 5))
    // dispatch({type: 'notification/changeNotification', payload: `created '${content}'`})
    // dispatch({type: 'notification/changeVisibility', payload: ''})
    // setTimeout(() => {
    //   dispatch({type: 'notification/changeVisibility', payload: 'none'})
    // }, 5000)
  }

  return (
    <form onSubmit={create}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
    </form>
  )
}

export default AnecdoteForm