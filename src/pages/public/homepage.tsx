import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPropertiesAction } from "../../redux/action/property";
import { AppDispatch, RootState } from '../../redux/store';
import NavBar from '@/AppComponent/navbar';
import Footer from '@/AppComponent/footer';
import { Properties } from '@/types/types';
import { FaMapMarkerAlt } from 'react-icons/fa';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { properties, status } = useSelector((state: RootState) => state.propetiess);

  const property = Object.values(properties).flat().slice(0, 6) || [];

  useEffect(() => {
    dispatch(fetchPropertiesAction());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <div className='hero h-[100vh]'>
        <div className='relative top-1/2 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 md:max-w-5xl md:w-11/12 text-center text-white'>
          <h4 className='font-extrabold xl:text-6xl tracking-widest text-[3.5rem] pt-40 '> BENO RENTAL BOOKING PROPERTY </h4>
          <p className='mt-12 leading-6 xl:text-2xl text-xl w-full pr-3 pl-3 xl:pr-44 xl:pl-44'>
            Your next home away from home is just a click away!
          </p>
          <div className='flex w-full justify-center items-center mt-32 text-white'>
            <div className="mouse"></div>
          </div>
        </div>
        <div>
        </div>
      </div>
      <div className='ml-4 mt-8 md:ml-10 md:mr-6'>
        <h1 className='leading-6 xl:text-2xl text-xl mb-8'>Recent Property</h1>
        {status === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/30 dark:bg-black/30 backdrop-blur-sm z-10">
            loading ...
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mb-8">
          {property.map((property: Properties) => (
            <div key={property.id} className={`flex flex-col gap-2 py-2 pr-2 transition-opacity ${status === "loading" ? "opacity-50" : "opacity-100"}`}>
              <div className="rounded-xl bg-white dark:bg-color4 border overflow-hidden flex flex-col h-full relative">
                <div className="h-1/2 relative">
                  <img src={property.propertyImage || ''} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-black text-white px-2 py-1 rounded-md">
                    $ {property.pricePerNight}/Night
                  </div>
                </div>
                <div className="flex-1 pt-10 px-2">
                  <h2 className="font-bold text-lg text-center">{property.title.charAt(0).toUpperCase() + property.title.slice(1)}</h2>
                  <h2 className=" text-md flex items-center justify-center mt-2">
                    <FaMapMarkerAlt className="mr-1" />
                    {property.location.charAt(0).toUpperCase() + property.location.slice(1)}
                  </h2>
                </div>
                <div className='flex justify-between items-center px-8 pb-6'>
                  <Dialog>
                    <DialogTrigger className='text-sm text-blue-500 cursor-pointer'>View more</DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <div className="flex flex-col md:flex-row">
                        <img src={property.propertyImage || ''} className="w-full md:w-1/2 h-60 object-cover rounded-lg" />
                        <div className="p-2 md:pl-8">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">{property.title.charAt(0).toUpperCase() + property.title.slice(1)}</DialogTitle>
                          </DialogHeader>
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;