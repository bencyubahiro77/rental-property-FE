import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPropertiesAction } from "../../redux/action/property";
import { AppDispatch, RootState } from '../../redux/store';
import NavBar from '@/AppComponent/navbar';
import Footer from '@/AppComponent/footer';
import { Properties } from '@/types/types';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { properties, status } = useSelector((state: RootState) => state.propetiess);
  const property = Object.values(properties).flat() || [];

  useEffect(() => {
    dispatch(fetchPropertiesAction());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <div className='hero h-[100vh]'>
        <div className='absolute top-1/2 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 md:max-w-5xl md:w-11/12 text-center'>
          <h4 className='font-extrabold xl:text-6xl tracking-widest text-[3.5rem] pt-40 '> BENO RENTAL BOOKING PROPERTY </h4>
          <p className='mt-12 leading-6 xl:text-2xl text-xl w-full pr-3 pl-3 xl:pr-44 xl:pl-44'>
            Your next home away from home is just a click away!
          </p>
          <div className='flex w-full justify-center items-center mt-32'>
            <div className="mouse"></div>
          </div>
        </div>
        <div>
        </div>
      </div>
      <div className='ml-4 mt-8 md:ml-16'>
        <h1 className='leading-6 xl:text-2xl text-xl mb-8'>Recent Property</h1>
        {status === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/30 dark:bg-black/30 backdrop-blur-sm z-10">
            loading ...
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {property.map((property: Properties) => (
            <div key={property.id} className={`flex flex-col gap-2 py-2 pr-2 transition-opacity ${status === "loading" ? "opacity-50" : "opacity-100"}`}>
              <div className="rounded-xl bg-white dark:bg-color4 border overflow-hidden flex flex-col h-full relative">
                <div className="h-1/2 relative">
                  <img src={property.propertyImage || ''} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-black text-white px-2 py-1 rounded-md">
                    $ {property.pricePerNight}
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
                  <h1 className="text-sm text-blue-500 cursor-pointer">View more</h1>
                  <Button>Book</Button>
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