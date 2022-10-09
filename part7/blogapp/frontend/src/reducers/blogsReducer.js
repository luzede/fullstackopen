import { createSlice } from '@reduxjs/toolkit'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      const blogs = action.payload
      return blogs
    },
    voteBlog(state, action) {
      const blog = action.payload
      return state.map(b => b.id !== blog.id ? b : blog)
    },
    appendBlog(state, action) {
      const blog = action.payload
      return [
        ...state,
        blog
      ]
    }
  }
})

export const { appendBlog, voteBlog, setBlogs } = blogsSlice.actions
export default blogsSlice.reducer