import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPropertiesAction } from "../../redux/action/property";
import { AppDispatch, RootState } from '../../redux/store';
import NavBar from '@/AppComponent/navbar';
import Footer from '@/AppComponent/footer';
import { Properties } from '@/types/types';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Slider } from "@/components/ui/slider"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast"
import Search from '@/AppComponent/search';

const allProperty = () => {
    type SliderProps = React.ComponentProps<typeof Slider>
    const [searchQuery, setSearchQuery] = useState("");
    const [priceRange, setPriceRange] = useState([0, 2000]);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');

    const dispatch = useDispatch<AppDispatch>();
    const { toast } = useToast()
    const { properties, status } = useSelector((state: RootState) => state.propetiess);
    const property = Object.values(properties).flat() || [];

    useEffect(() => {
        dispatch(fetchPropertiesAction());
    }, [dispatch]);

    const filteredPropeties = useMemo(() => {
        return property.filter((property: Properties) =>
            Object.values(property)
                .join(" ")
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) &&
            Number(property.pricePerNight) >= priceRange[0] &&
            Number(property.pricePerNight) <= priceRange[1]
        );
    }, [property, searchQuery, priceRange]);

    const handleSearch = (value: string) => {
        setSearchQuery(value);
    }

    const handlePriceChange = (value: number[]) => {
        setPriceRange(value);
    };

    const handleBookClick = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            ;
            toast({
                variant: "destructive",
                description: 'Login first',
            });
            return false;
        }
        return true;
    };

    const handleSubmit = (propertyId: string) => {
        console.log(`Property ID: ${propertyId}`);
        console.log(`Check-In Date: ${checkInDate}`);
        console.log(`Check-Out Date: ${checkOutDate}`);
    };

    return (
        <>
            <NavBar />
            <div className='mt-10'>
                <div className='ml-4 mt-16 md:ml-6 md:mr-6 '>
                    <div className='md:flex justify-between items-center md:mr-6'>
                        <h1 className='leading-6 xl:text-2xl text-xl'>All Properties({filteredPropeties.length})</h1>
                        <Search query={searchQuery} onSearch={handleSearch} />
                        <div className='md:w-1/4 mr-10 md:mr-0'>
                            <div className='flex justify-between'>
                                <span>${priceRange[0]}</span>
                                <span>${priceRange[1]}</span>
                            </div>
                            <Slider
                                className='mt-2'
                                defaultValue={priceRange}
                                max={2000}
                                step={20}
                                onValueChange={handlePriceChange as SliderProps['onValueChange']}
                            />
                        </div>
                    </div>
                    {status === "loading" ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/30 dark:bg-black/30 backdrop-blur-sm z-10">
                            loading ...
                        </div>
                    ) : filteredPropeties.length === 0 ? (
                        <div className="text-center pt-20 h-[100vh]">
                            <span className="text-md dark:text-white">No results found</span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 mb-8 mt-8">
                            {filteredPropeties.map((property: Properties) => (
                                <div key={property.id} className={`flex flex-col gap-2 py-2 pr-2 transition-opacity }`}>
                                    <div className="rounded-xl bg-white dark:bg-color4 border overflow-hidden flex flex-col h-full relative">
                                        <div className="h-1/2 relative">
                                            <img src={property.propertyImage || ''} className="w-full h-full object-cover" />
                                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-black text-white px-2 py-1 rounded-md">
                                                $ {property.pricePerNight}/Night
                                            </div>
                                        </div>
                                        <div className="flex-1 pt-10 px-2">
                                            <h2 className="font-bold text-lg text-center">{property.title.charAt(0).toUpperCase() + property.title.slice(1)}</h2>
                                            <h2 className="font-bold text-md flex items-center justify-center mt-2">
                                                <FaMapMarkerAlt className="mr-1" />
                                                {property.location.charAt(0).toUpperCase() + property.location.slice(1)}
                                            </h2>
                                        </div>
                                        <div className='flex justify-between items-center px-8 pb-6'>
                                            <Dialog>
                                                <DialogTrigger className='text-sm text-blue-500 cursor-pointer'>View more</DialogTrigger>
                                                <DialogContent className="max-w-3xl">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-2xl font-bold">{property.title.charAt(0).toUpperCase() + property.title.slice(1)}</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="flex flex-col md:flex-row">
                                                        <img src={property.propertyImage || ''} className="w-full md:w-1/2 h-60 object-cover rounded-lg" />
                                                        <div className="p-4 md:pl-8">
                                                            <div>
                                                                <Label className='font-bold'>Price</Label>
                                                                <h2 className="text-sm mb-2">${property.pricePerNight}/Night</h2>
                                                            </div>
                                                            <div>
                                                                <Label className='font-bold'>Location</Label>
                                                                <h2 className="text-sm flex items-center">
                                                                    <FaMapMarkerAlt className="mr-2" />
                                                                    {property.location.charAt(0).toUpperCase() + property.location.slice(1)}
                                                                </h2>
                                                            </div>
                                                            <div className='mt-2'>
                                                                <Label className='font-bold'>Description</Label>
                                                                <p className="text-sm">{property.description}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button onClick={(e) => {
                                                        if (!handleBookClick()) e.preventDefault();
                                                    }}>Book</Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-md">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-2xl font-bold">Book {property.title}</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="flex flex-col gap-4">
                                                        <div>
                                                            <Label className='font-bold'>Check-In</Label>
                                                            <input type="date" className="w-full border rounded-md p-2" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
                                                        </div>
                                                        <div>
                                                            <Label className='font-bold'>Check-Out</Label>
                                                            <input type="date" className="w-full border rounded-md p-2" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
                                                        </div>
                                                        <Button onClick={() => handleSubmit(property.id)}>Submit</Button>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>

    )
}

export default allProperty