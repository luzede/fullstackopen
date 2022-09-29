import { createSlice, current } from "@reduxjs/toolkit"
import s from '../services/anecdotes'




const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const anecdote = action.payload
      return current(state).map(a =>
        a.id !== anecdote.id
        ? a
        : anecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      return [
        ...state,
        action.payload
      ]
    }
  },
})

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await s.add({
      content,
      votes: 0
    })
    dispatch(appendAnecdote(anecdote))
  }
}

export const vote_anecdote = (id) => {
  return async (dispatch) => {
    const anecdote = await s.vote(id)
    dispatch(voteAnecdote(anecdote))
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await s.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}




export const { voteAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer