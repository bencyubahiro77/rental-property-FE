import { configureStore } from '@reduxjs/toolkit'
import loginReducer from "./slice/login"
import createBookingSlice from "./slice/createBooking"
import createPropertySlice from "./slice/createProperty"
import bookingsSlice from "./slice/bookings"
import PropetiesSlice from "./slice/property"
import deletePropertySlice from "./slice/deleteProperty"
import updateBookingStatusSlice from "./slice/updateBooking"
import updatePropertySlice from "./slice/updateProperty"

export const store = configureStore({
  reducer: {
    login: loginReducer,
    createBooking: createBookingSlice,
    updateBookingStatus: updateBookingStatusSlice,
    createProperty: createPropertySlice,
    updateProperty: updatePropertySlice,
    bookings: bookingsSlice,
    propetiess: PropetiesSlice,
    deleteProperty: deletePropertySlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch