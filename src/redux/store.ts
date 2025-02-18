import { configureStore } from '@reduxjs/toolkit'
import loginReducer from "./slice/login"
import createUserSlice from "./slice/createUser"
import createPropertySlice from "./slice/createProperty"
import usersSlice from "./slice/users"
import PropetiesSlice from "./slice/property"
import deleteUsersSlice from "./slice/deleteUser"
import deletePropertySlice from "./slice/deleteProperty"
import updateUserSlice from "./slice/updateUser"
import updatePropertySlice from "./slice/updateProperty"

export const store = configureStore({
  reducer: {
    login: loginReducer,
    createUser: createUserSlice,
    updateUser: updateUserSlice,
    createProperty: createPropertySlice,
    updateProperty: updatePropertySlice,
    users: usersSlice,
    propetiess: PropetiesSlice,
    deleteUser: deleteUsersSlice,
    deleteProperty: deletePropertySlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch