import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Welcome',
  reducers: {
    changeNotification(_state, action) {
      const notification = action.payload
      return (notification)
    }
  }
})

export const { changeNotification } = notificationSlice.actions
export default notificationSlice.reducer