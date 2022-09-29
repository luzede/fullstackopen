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
      return ({
        ...state,
        display: action.payload
      })
    },
  }
})

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    dispatch(changeNotification(message))
    dispatch(changeVisibility(''))
    setTimeout(() => {
      dispatch(changeVisibility('none'))
    }, seconds*1000)
  }
}

export const { changeNotification, changeVisibility } = notificationSlice.actions
export default notificationSlice.reducer