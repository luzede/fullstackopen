import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

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
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    }
  }
})

export const createBlog = (blog) => {
  return async (dispatch) => {
    const addedBlog = await blogService.create(blog)
    dispatch(appendBlog(addedBlog))
  }
}

export const updateBlog = (id, update) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(id, update)
    dispatch(voteBlog(updatedBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.del(id)
    dispatch(removeBlog(id))
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.slice().sort((a, b) => (b.likes - a.likes))))
  }
}



export const { appendBlog, voteBlog, setBlogs, removeBlog } = blogsSlice.actions
export default blogsSlice.reducer