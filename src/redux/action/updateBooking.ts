import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';
import tokenHeaders from '@/AppComponent/token';
import { fetchBookingAction } from "./Booking"


export const updateBookingStatusAction = createAsyncThunk('updateBookingStatus', async ({ id, formData }: { id: string ; formData: { status:string } },
    { dispatch, rejectWithValue }) => {
    try {
        const response = await API.put(`booking/updateBooking/${id}`, formData,
            {
                headers: tokenHeaders()
            });
        dispatch(fetchBookingAction())
        return response.data;
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.error || 'An unexpected error occurred.'
        );
    }
})