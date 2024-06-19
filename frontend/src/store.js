import {configureStore} from "@reduxjs/toolkit"
import slice from './redux/Slice'
import Blogs from './redux/Blogs'
const store = configureStore({
    reducer:{
        slice : slice,
        Blogs : Blogs,
    }
})

export default store;   