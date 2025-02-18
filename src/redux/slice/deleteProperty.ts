import { createSlice } from '@reduxjs/toolkit'
import { deletePropertyAction } from '../action/deleteProperty'

const initialState = {
    property: null,
    loading: false,
    error: null,
}

const deletePropertySlice = createSlice({
    name: 'deleteProperty',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deletePropertyAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePropertyAction.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deletePropertyAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            })
    },
})
export default deletePropertySlice.reducer