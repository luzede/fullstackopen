import { useSelector, useDispatch } from "react-redux"
import s from '../services/anecdotes'



const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => [...state.anecdotes].sort((a, b) => b.votes - a.votes)
    .filter(a => a.content.includes(filter)))

  const vote = (id) => {
    s.vote(id).then(() => {
      console.log('upvoted');
    })
    dispatch({type: 'anecdotes/voteAnecdote', payload: id})
    dispatch({type: 'notification/changeNotification', payload: `you voted '${anecdotes.find(a => a.id === id).content}`})
    dispatch({type: 'notification/changeVisibility', payload: ''})
    setTimeout(() => {
      dispatch({type: 'notification/changeVisibility', payload: 'none'})
    }, 5000)
  }

  return (
    <>
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
    </>
  )
}

export default AnecdoteList
