export interface paginationProps{
    currentPage: number,
    totalPages: number,
    onPageCHange: (page: number) => void
}

export interface SearchProps {
    query: string; 
    onSearch: (value: string) => void; 
}

export interface ToastProps {
    message: any;
    type:any
}

export interface User {
    firstName: string;
    lastName: string;
}

export interface Property {
    title: string;
}
export interface Bookings {
    id: string;
    userId:string;
    propertyId: string
    checkInDate: string;
    checkOutDate: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    user: User;
    property: Property;
}

export interface BookingsState {
    bookings:  Record<number, Bookings[]>;
    totalBooking:number
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface PropertiesState {
    properties: Record<number,Properties[]>;
    totalProperties: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface Properties {
    id: string,
    title: string,
    description: string,
    pricePerNight: string,
    location: string,
    hostId: string,
    hostName: string,
    propertyImage: null,
    createdAt: string,
    updatedAt: string
}