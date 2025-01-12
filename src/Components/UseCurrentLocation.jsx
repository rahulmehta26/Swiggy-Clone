import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { setGeoCode } from '../Redux/geoCodeSlice';

const useCurrentLocation = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = () => {
      
      const hardcodedLocation = {
        latitude: 12.9716, 
        longitude: 77.5946, 
      };

      dispatch(
        setGeoCode({
          lat: hardcodedLocation.latitude.toString(),
          lng: hardcodedLocation.longitude.toString(),
        })
      );
      setLoading(false);
    };

    fetchLocation();
  }, [dispatch]);

  return { loading };
};

export default useCurrentLocation;
