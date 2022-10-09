import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', type: 'success', display: 'none', timeoutID: null },
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
    changeType(state, action) {
      return ({
        ...state,
        type: action.payload
      })
    }
  }
})

export const setNotification = (message, type, seconds) => {
  return (dispatch) => {
    dispatch(changeNotification(message))
    dispatch(changeVisibility(''))
    dispatch(changeType(type))
    const tID = setTimeout(() => {
      dispatch(changeVisibility('none'))
    }, seconds * 1000)
    dispatch(setTimeoutID(tID))
  }
}

export const { changeNotification, changeVisibility, setTimeoutID, changeType } = notificationSlice.actions
export default notificationSlice.reducer