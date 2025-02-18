import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';
import tokenHeaders from '@/AppComponent/token';
import { fetchBookingAction } from "./Booking"


export const createUserAction = createAsyncThunk('createUser', async (formData: { name: string; email: string, phoneNumber:string, role:string }, { dispatch,rejectWithValue }) =>{
    try{
        const response = await API.post("user/createUser",formData,
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