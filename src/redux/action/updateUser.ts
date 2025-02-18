import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';
import tokenHeaders from '@/AppComponent/token';
import { fetchUsersAction } from "../../redux/action/users"


export const updateUserAction = createAsyncThunk('updateUser', async ({ id, formData }: { id: { uuid: string }; formData: { name: string; email: string; phoneNumber: string; role: string } },
    { dispatch, rejectWithValue }) => {
    try {
        const response = await API.put(`user/updateUser/${id.uuid}`, formData,
            {
                headers: tokenHeaders()
            });
        dispatch(fetchUsersAction(1))
        return response.data;
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.error || 'An unexpected error occurred.'
        );
    }
})