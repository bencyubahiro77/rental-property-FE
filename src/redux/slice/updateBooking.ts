import { createSlice } from '@reduxjs/toolkit'
import { updateBookingStatusAction } from "../action/updateBooking"

const initialState = {
    user: null,
    loading: false,
    error: null,
}

const updateBookingStatus = createSlice({
    name: 'updateBookingStatus',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateBookingStatusAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBookingStatusAction.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateBookingStatusAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            });
    },
})

export default updateBookingStatus.reducer