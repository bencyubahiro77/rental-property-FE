import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';
import {jwtDecode} from 'jwt-decode';

export const loginAction = createAsyncThunk('authentication', async (formData: { email: string; password: string }, { rejectWithValue }) =>{
    try{
        const response = await API.post("auth/login",formData);
        const {token } = response.data;

        // Decode the token
        const decoded= jwtDecode(token);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(decoded));
        
        return response.data;
    }catch (error:any) {
        return rejectWithValue(
            error.response?.data?.message || 'An unexpected error occurred.'
          );
    }
    
})