//import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import { combineReducers, createStore } from 'redux'
import fitlerReducer from './reducers/fitlerReducer';

const reducers = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: fitlerReducer
})

const store = createStore(reducers)
// let store = configureStore({
//   reducer: {
//     anecdotes: anecdoteReducer,
//     notification: notificationReducer,
//   }
// })


export default store;