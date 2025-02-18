import { createSlice } from '@reduxjs/toolkit'
import { createUserAction } from "../action/createUser"

const initialState = {
    user: null,
    loading: false,
    error: null,
}

const createUserSlice = createSlice({
    name: 'createUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUserAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUserAction.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(createUserAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            });
    },
})

export default createUserSlice.reducer