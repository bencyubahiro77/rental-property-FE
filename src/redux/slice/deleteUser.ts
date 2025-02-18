import { createSlice} from '@reduxjs/toolkit'
import {deleteUserAction} from '../action//deleteUser'

const initialState = {
    user: null,
    loading: false,
    error: null,
}

const deleteUsersSlice = createSlice({
    name: 'deleteUsers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteUserAction.pending, (state) =>{
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUserAction.fulfilled, (state,action) =>{
                state.loading = false;
                state.user = action.payload.user;
        
                // state.usersByPage = state.usersByPage.filter((user) =>user.uu)
            })
            .addCase(deleteUserAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as any;
            })
    },
})
export default deleteUsersSlice.reducer