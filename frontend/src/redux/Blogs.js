import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    blogs : {
        allBlogs : []
    }
}

const blogSlice = createSlice({
    name : 'blog',
    initialState,
    reducers : {
        allBlogs : (state, action) => {
            state.blogs.allBlogs = action.payload
        }
    }
})


export const {allBlogs} = blogSlice.actions
export default blogSlice.reducer