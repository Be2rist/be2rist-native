import React, {createContext, useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';

const GeoLocationContext = createContext();

const GeoLocationProvider = ({children}) => {
  const [position, setPosition] = useState({});

  useEffect(() => {
    const id = Geolocation.watchPosition(
      e =>
        setPosition({
          latitude: e.coords.latitude,
          longitude: e.coords.longitude,
        }),
      console.log,
      {
        enableHighAccuracy: true,
        distanceFilter: 1,
        interval: 1000,
        fastestInterval: 500,
      },
    );
    return () => Geolocation.clearWatch(id);
  }, []);

  return (
    <GeoLocationContext.Provider value={{position}}>
      {children}
    </GeoLocationContext.Provider>
  );
};

export {GeoLocationContext, GeoLocationProvider};
