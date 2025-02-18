import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';
import tokenHeaders from '@/AppComponent/token';
import { fetchUsersAction } from "../../redux/action/users"


export const createUserAction = createAsyncThunk('createUser', async (formData: { name: string; email: string, phoneNumber:string, role:string }, { dispatch,rejectWithValue }) =>{
    try{
        const response = await API.post("user/createUser",formData,
            {headers: tokenHeaders()
        });
        dispatch(fetchUsersAction(1))
        return response.data;
    }catch (error:any) {
        return rejectWithValue(
            error.response?.data?.error || 'An unexpected error occurred.'
        );
    }
})