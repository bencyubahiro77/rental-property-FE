import { createSlice } from '@reduxjs/toolkit'
import { updatePropertyAction } from "../action/updateProperty"

const initialState = {
    property: null,
    loading: false,
    error: null,
}

const updatePropertySlice = createSlice({
    name: 'updateProperty',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updatePropertyAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePropertyAction.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updatePropertyAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            });
    },
})

export default updatePropertySlice.reducer