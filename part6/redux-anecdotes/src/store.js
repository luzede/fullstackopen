//import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer, { voteAnecdote, createAnecdote }from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import { combineReducers, createStore } from 'redux'


console.log(voteAnecdote);
console.log(createAnecdote);
const reducers = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
})

const store = createStore(reducers)
// let store = configureStore({
//   reducer: {
//     anecdotes: anecdoteReducer,
//     notification: notificationReducer,
//   }
// })


export default store;