import { createSlice} from '@reduxjs/toolkit'
import { fetchPropertiesAction } from "../action/property"
import { PropertiesState } from '../../types/types'

const initialState: PropertiesState = {
    properties:[],
    totalBlogs: 0,
    status: 'idle',
    error: null,
}

const PropetiesSlice = createSlice({
    name: 'Propeties',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPropertiesAction.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPropertiesAction.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.properties = action.payload.data.data;  
                state.totalBlogs = action.payload.data.total; 
            })
            
            .addCase(fetchPropertiesAction.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
})

export default PropetiesSlice.reducer