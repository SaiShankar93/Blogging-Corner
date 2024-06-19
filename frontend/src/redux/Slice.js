import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        _id: "",
        username: "",
        email: "",
        mobile: 0,
        isLoggedIn: false,
    }
};
const Slice = createSlice({
    name: "slice",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.user = {
                ...state.user,
                email: action.payload.email,
                username: action.payload.username,
                isLoggedIn: true
            }
            console.log(state.user)
        },
        signUpUser: (state, action) => {
            const userData = action.payload;
            state.user = {
                ...state.user,
                _id: userData._id,
                username: userData.username,
                email: userData.email,
                mobile: userData.mobile,
                isLoggedIn: true
            };
        },
        logoutUser: (state) => {
            state.user = {
                _id: "",
                username: "",
                email: "",
                mobile: 0,
                isLoggedIn: false
            };
        },
    },
});

export const { loginUser, signUpUser, logoutUser } = Slice.actions;
export default Slice.reducer;