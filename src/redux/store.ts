import { configureStore } from '@reduxjs/toolkit'
import loginReducer from "./slice/login"
import createUserSlice from "./slice/createBooking"
import createPropertySlice from "./slice/createProperty"
import bookingsSlice from "./slice/bookings"
import PropetiesSlice from "./slice/property"
import deletePropertySlice from "./slice/deleteProperty"
import updateUserSlice from "./slice/updateBooking"
import updatePropertySlice from "./slice/updateProperty"

export const store = configureStore({
  reducer: {
    login: loginReducer,
    createUser: createUserSlice,
    updateUser: updateUserSlice,
    createProperty: createPropertySlice,
    updateProperty: updatePropertySlice,
    bookings: bookingsSlice,
    propetiess: PropetiesSlice,
    deleteProperty: deletePropertySlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch