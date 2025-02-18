import React, { useEffect, useMemo, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchBookingAction } from "../../redux/action/Booking"
import { updateBookingStatusAction } from '../../redux/action/updateBooking';
import { SidebarProvider, SidebarTrigger, SidebarInset, } from "@/components/ui/sidebar"
import { SideBar } from "@/AppComponent/sideBar"
import { ModeToggle } from '@/AppComponent/mode-toggle'
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Loader2 } from "lucide-react"
import { Bookings } from '../../types/types';
import { AppDispatch, RootState } from '../../redux/store';
import Search from "@/AppComponent/search"
import { useToast } from "@/hooks/use-toast"
import { unwrapResult } from '@reduxjs/toolkit';

export default function Booking() {
    return (
        <div>
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "15rem",
                    } as React.CSSProperties
                }
            >
                <SideBar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 px-4 justify-between mb-4">
                        <SidebarTrigger className="-ml-1 dark:text-white" />
                        <ModeToggle />
                    </header>
                    <BookingsContent />
                </SidebarInset>
            </SidebarProvider>

        </div>
    )
}

export const BookingsContent = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const dispatch = useDispatch<AppDispatch>();
    const { toast } = useToast()

    const { bookings, status } = useSelector((state: RootState) => state.bookings);

    // Get cached users for the current page
    const booking = Object.values(bookings).flat() || [];

    useEffect(() => {
        dispatch(fetchBookingAction())
    }, [dispatch]);

    const filteredBookings = useMemo(() => {
        return booking.filter((user: Bookings) =>
            Object.values(user)
                .join(" ")
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
        )
    }, [booking, searchQuery])

    const handleSearch = (value: string) => {
        setSearchQuery(value);
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        let formDataToSend = {
            id: id,
            formData: { status: newStatus }
        };
        try {
            const resultAction = await dispatch(updateBookingStatusAction(formDataToSend));
            unwrapResult(resultAction);
            const successMessage = resultAction.payload?.message || 'Property Updated successfully!';
            toast({
                description: successMessage,
            });
        } catch (error: any) {
            const errorMessage = error?.message || 'Failed to update property!';
            toast({
                variant: "destructive",
                description: errorMessage,
            })
        }
    }

    const formDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    }

    return (
        <div className="ml-8 mr-12 stick">
            <div className="flex justify-between">
                <h1 className="text-3xl dark:text-white  font-bold">Bookings</h1>
                <Search query={searchQuery} onSearch={handleSearch} />
            </div>
            <div className="mt-12 dark:text-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Property</TableHead>
                            <TableHead>Booked By</TableHead>
                            <TableHead>Check In Date</TableHead>
                            <TableHead>Check Out Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-center" >Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {status === "loading" ? (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <div className="flex items-center justify-center h-40">
                                        <span className="text-lg dark:text-white flex">
                                            <Loader2 className="animate-spin" />
                                            <p className="pl-2">Loading...</p>
                                        </span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filteredBookings.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <div className="flex items-center justify-center h-40">
                                        <span className="text-lg dark:text-white">No results found</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredBookings.map((booking: Bookings) => (
                                <TableRow key={booking.id}>
                                    <TableCell >{booking.property.title}</TableCell>
                                    <TableCell>{booking.user.firstName} {booking.user.lastName}</TableCell>
                                    <TableCell>{formDate(booking.checkInDate)}</TableCell>
                                    <TableCell>{formDate(booking.checkOutDate)}</TableCell>
                                    <TableCell>{booking.status}</TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex gap-2 items-center justify-center">
                                            {(booking.status === "Confirmed" || booking.status === "Canceled") && (
                                                <h1>-</h1>
                                            )}
                                            {booking.status === "Pending" && (
                                                <>
                                                    <Button
                                                        onClick={() => handleStatusChange(booking.id, "Confirmed")}
                                                    >
                                                        Confirm
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleStatusChange(booking.id, "Canceled")}
                                                        variant="destructive"
                                                    >
                                                        Cancel
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}