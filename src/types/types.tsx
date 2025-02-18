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
    _id: string;
    uuid: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
}

export interface UsersState {
    usersByPage:  Record<number, User[]>;
    currentPage: number;
    totalPages: number;
    totalUsers:number
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface PropertiesState {
    properties: Record<number,Properties[]>;
    totalBlogs: number;
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