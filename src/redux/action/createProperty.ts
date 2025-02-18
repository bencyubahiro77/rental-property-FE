import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api';
import tokenHeaders from '@/AppComponent/token';
import {fetchPropertiesAction} from "./property"


export const createPropertyAction = createAsyncThunk(
    'createProperty',
    async (formData: { title: string; description: string; propertyImage: File | null; pricePerNight: string, location: string }, {dispatch, rejectWithValue }) => {
      try {
        const data = new FormData(); 
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('pricePerNight', formData.pricePerNight);
        data.append('location', formData.location);
  
  
        if (formData.propertyImage) {
          data.append('propertyImage', formData.propertyImage);
        }
  
        const response = await API.post('/property/createProperty', data, {
          headers: {
            ...tokenHeaders(), 
            'Content-Type': 'multipart/form-data', // Ensure the Content-Type is multipart/form-data
          },
        });
        dispatch(fetchPropertiesAction())
  
        return response.data;
      } catch (error: any) {
        return rejectWithValue(
          error.response?.data?.error || 'An unexpected error occurred.'
        );
      }
    }
);
  