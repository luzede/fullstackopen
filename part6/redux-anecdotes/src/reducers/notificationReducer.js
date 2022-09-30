import { createSlice } from "@reduxjs/toolkit";


const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: 'Welcome', display: 'none', timeoutID: null },
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
    setTimeoutID(state, action) {
      clearTimeout(state.timeoutID)
      return ({
        ...state,
        timeoutID: action.payload
      })
    },
  }
})

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    dispatch(changeNotification(message))
    dispatch(changeVisibility(''))
    const tID = setTimeout(() => {
      dispatch(changeVisibility('none'))
    }, seconds*1000)
    dispatch(setTimeoutID(tID))
  }
}

export const { changeNotification, changeVisibility, setTimeoutID } = notificationSlice.actions
export default notificationSlice.reducer