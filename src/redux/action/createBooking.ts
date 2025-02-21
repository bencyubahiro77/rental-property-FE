import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';
import tokenHeaders from '@/AppComponent/token';
import { fetchBookingAction } from "./Booking"


export const createBookingAction = createAsyncThunk('createBooking', async (formData: { propertyId: string; checkInDate: string, checkOutDate:string}, { dispatch,rejectWithValue }) =>{
    try{
        const response = await API.post("booking/createBooking",formData,
            {headers: tokenHeaders()
        });
        dispatch(fetchBookingAction())
        return response.data;
    }catch (error:any) {
        return rejectWithValue(
            error.response?.data?.error || 'An unexpected error occurred.'
        );
    }
})