import { createSlice } from '@reduxjs/toolkit'
import { fetchBookingAction } from "../action/Booking"
import { BookingsState } from '../../types/types'

const initialState: BookingsState = {
    bookings: [],
    totalBooking: 0,
    status: 'idle',
    error: null,
}

const bookingSlice = createSlice({
    name: 'bookings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookingAction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBookingAction.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.bookings = action.payload.data.data;
                state.totalBooking = action.payload.data.total
            })
            .addCase(fetchBookingAction.rejected, (state) => {
                state.status = 'failed';
            });
    },
})
export default bookingSlice.reducer