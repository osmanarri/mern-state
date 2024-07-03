import { createSlice } from "@reduxjs/toolkit";

// create an initial state
const initialState = {
    currentUser: null,
    error: null,
    isLoading: false
}

// create a slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

// Export the actions and the reducer
export const { loginStart, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;
