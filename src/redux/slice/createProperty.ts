import { createSlice } from '@reduxjs/toolkit'
import { createPropertyAction } from "../action/createProperty"

const initialState = {
    user: null,
    loading: false,
    error: null,
}

const createPropertySlice = createSlice({
    name: 'createProperty',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPropertyAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPropertyAction.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createPropertyAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            });
    },
})

export default createPropertySlice.reducer