import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import { connect } from "react-redux"

const AnecdoteForm = (props) => {

  const create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.createAnecdote(content)
    // dispatch(setNotification(`created '${content}'`, 5))
    props.setNotification(`created '${content}'`, 5)
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

const mapDispatchToState = (dispatch) => {
  return {
    setNotification: (message, seconds) => {
      dispatch(setNotification(message, seconds))
    },
    createAnecdote: (value) => {
      dispatch(createAnecdote(value))
    }
  }
}

const connectedAnecdoteForm = connect(null, mapDispatchToState)(AnecdoteForm)
 
export default connectedAnecdoteForm