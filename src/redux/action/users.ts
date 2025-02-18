import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';
import tokenHeaders from '@/AppComponent/token';


export const fetchUsersAction = createAsyncThunk('fetchUser', async (page:number, { rejectWithValue }) =>{
    try{
        const response = await API.get(`/user/getallUser?page=${page}`,
            {headers: tokenHeaders()
        });
        return {data:response.data, total: response.data.total};
    }catch (error:any) {
        return rejectWithValue(
            error.response?.data?.error || 'An unexpected error occurred.'
        );
    }
})