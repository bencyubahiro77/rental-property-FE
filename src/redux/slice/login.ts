import { createSlice } from '@reduxjs/toolkit'
import { loginAction } from "../action/login"

const initialState = {
    token: null,
    user: null,
    loading: false,
    error: null
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.accessToken;
            })
            .addCase(loginAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            });
    },
})

export default loginSlice.reducer