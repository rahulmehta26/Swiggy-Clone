import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { setGeoCode } from '../Redux/geoCodeSlice';

const useCurrentLocation = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            dispatch(setGeoCode({ lat: latitude.toString(), lng: longitude.toString() }));
            setLoading(false); 
          },
          (error) => {
            toast.error('Unable to retrieve your location. Please try again.');
            setLoading(false); r
          }
        );
      } else {
        toast.error('Geolocation is not supported by this browser.');
        setLoading(false); 
      }
    };

    fetchLocation();
  }, [dispatch]);

  return { loading }; 
};

export default useCurrentLocation;
