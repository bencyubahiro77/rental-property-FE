import { createSlice } from '@reduxjs/toolkit'
import { createBookingAction } from "../action/createBooking"

const initialState = {
    booking: null,
    loading: false,
    error: null as string | object | null,
}

const createBookingSlice = createSlice({
    name: "createBooking",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createBookingAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBookingAction.fulfilled, (state, action) => {
                state.loading = false;
                state.booking = action.payload.booking;
            })
            .addCase(createBookingAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An unexpected error occurred."; 
            });
    },
});


export default createBookingSlice.reducer