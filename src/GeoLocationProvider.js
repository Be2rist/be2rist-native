import React, {createContext, useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';

const GeoLocationContext = createContext();

const GeoLocationProvider = ({children}) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      Geolocation.getCurrentPosition(e => {
        if (
          !(
            e.coords.latitude === position?.latitude &&
            e.coords.longitude === position?.longitude
          )
        ) {
          setPosition({
            latitude: e.coords.latitude,
            longitude: e.coords.longitude,
          });
        }
      }, console.log);
    }, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GeoLocationContext.Provider value={{position}}>
      {children}
    </GeoLocationContext.Provider>
  );
};

export {GeoLocationContext, GeoLocationProvider};
