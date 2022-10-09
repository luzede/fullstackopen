import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'


const store = configureStore({
  reducer: {
    notification: notificationReducer,
    // blogs,
    // user,
  }
})

export default store