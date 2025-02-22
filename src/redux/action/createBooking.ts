import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';
import tokenHeaders from '@/AppComponent/token';
import { fetchBookingAction } from "./Booking"


export const createBookingAction = createAsyncThunk(
    'createBooking',
    async (
        formData: { propertyId: string; checkInDate: string; checkOutDate: string },
        { dispatch, rejectWithValue }
    ) => {
        try {
            const response = await API.post("booking/createBooking", formData, {
                headers: tokenHeaders(),
            });
            dispatch(fetchBookingAction());
            return response.data;
        } catch (error: any) {
            console.error('API Error:', error.response?.data); // Debugging output

            // Extract backend error message
            const errorMessage =
                error.response?.data?.message || 'An unexpected error occurred.';

            return rejectWithValue(errorMessage);
        }
    }
);
