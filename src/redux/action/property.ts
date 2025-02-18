import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';


export const fetchPropertiesAction = createAsyncThunk(
    'fetchProperties',
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.get("/property/getAllProperties");
            return { data: response.data };
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.error || 'An unexpected error occurred.'
            );
        }
    }
);
