import { createSlice, current } from "@reduxjs/toolkit"




const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdote = current(state).find((a) => a.id === id)
      const votedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1,
      }
      return current(state).map(a =>
        a.id !== id
        ? a
        : votedAnecdote)
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

export const { voteAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer