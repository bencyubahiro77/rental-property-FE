import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';
import { jwtDecode } from 'jwt-decode';
import { NavigateFunction } from 'react-router-dom';

export const loginAction = createAsyncThunk('loginWithGoogle', async ({ token, navigate }: { token: string, navigate: NavigateFunction }, { rejectWithValue }) => {
    try {
        const response = await API.post("auth/callback", {
            accessToken: token
        });
        const { token: accessToken } = response.data;

        const decoded = jwtDecode(accessToken);
        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify(decoded));

        const storedUser = localStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : null

        if (user.role === "Hosts") {
            navigate('admin/booking');
        } else {
            navigate('/')
        };

        return { accessToken, user: decoded };

    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message || 'An unexpected error occurred.'
        );
    }

})