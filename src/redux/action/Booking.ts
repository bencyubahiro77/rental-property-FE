import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';
import tokenHeaders from '@/AppComponent/token';


export const fetchBookingAction = createAsyncThunk('fetchBooking', async (_,{ rejectWithValue }) =>{
    try{
        const response = await API.get("/booking/getAllBookings",
            {headers: tokenHeaders()
        });
        return {data:response.data, total: response.data.total};
    }catch (error:any) {
        return rejectWithValue(
            error.response?.data?.error || 'An unexpected error occurred.'
        );
    }
})