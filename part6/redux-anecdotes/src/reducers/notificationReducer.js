import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: 'Welcome', display: 'none' },
  reducers: {
    changeNotification(state, action) {
      const notification = action.payload
      return ({
        ...state,
        message: notification,
      })
    },
    changeVisibility(state, action) {
      //Empty string to show and 'none' to hide
      return {
        ...state,
        display: action.payload
      }
    }
  }
})

export const { changeNotification } = notificationSlice.actions
export default notificationSlice.reducer