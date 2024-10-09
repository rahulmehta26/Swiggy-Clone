import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { setGeoCode } from '../Redux/geoCodeSlice';

const useCurrentLocation = () => {

  const dispatch = useDispatch();

  useEffect(() => {

    const fetchLocation = () => {

      if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(

          (position) => {

            const { latitude, longitude } = position.coords;
         
            dispatch(setGeoCode({ lat: latitude.toString(), lng: longitude.toString() }));
          },
          (error) => {
            
            toast.error(error)
        
          }
        );
      }
    };

    fetchLocation();
  }, [dispatch]);
};

export default useCurrentLocation;
