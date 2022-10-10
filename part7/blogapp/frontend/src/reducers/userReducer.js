import { createSlice } from '@reduxjs/toolkit'
// import userService from '../services/users'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      const user = action.payload
      return user
    }
  }
})

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login(username, password)
    blogService.setToken(user.token)
    window.localStorage.setItem('user', JSON.stringify(user))
    dispatch(setUser(user))
  }
}



export const { setUser } = userSlice.actions
export default userSlice.reducer