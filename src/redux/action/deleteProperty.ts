import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';
import tokenHeaders from '@/AppComponent/token';
import { fetchPropertiesAction } from "./property"


export const deletePropertyAction = createAsyncThunk('deleteProperty', async (formData: { id:string}, { dispatch,rejectWithValue }) =>{
    try{
        const response = await API.delete(`property/deleteProperty/${formData}`, {
            headers: tokenHeaders()
        });
        dispatch(fetchPropertiesAction())
        return response.data;
    }catch (error:any) {
        return rejectWithValue(
            error.response?.data?.error || 'An unexpected error occurred.'
        );
    }
})