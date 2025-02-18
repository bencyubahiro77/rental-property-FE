import { createSlice } from '@reduxjs/toolkit'
import { updateUserAction } from "../action/updateUser"

const initialState = {
    user: null,
    loading: false,
    error: null,
}

const updateUserSlice = createSlice({
    name: 'updateUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateUserAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserAction.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(updateUserAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            });
    },
})

export default updateUserSlice.reducer