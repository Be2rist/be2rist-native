import React, {createContext, useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {enableLatestRenderer} from 'react-native-maps';

const GeoLocationContext = createContext();

const GeoLocationProvider = ({children}) => {
  const [position, setPosition] = useState({});
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    enableLatestRenderer();
    const id = Geolocation.watchPosition(
      ({coords}) => {
        !enabled && setEnabled(true);
        error && setError(null);
        setPosition(coords);
      },
      e => {
        !error && setError(e);
        setEnabled(false);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 1,
        interval: 1000,
        fastestInterval: 500,
      },
    );
    return () => {
      if (id) {
        Geolocation.clearWatch(id);
      }
    };
  }, [enabled, error]);

  return (
    <GeoLocationContext.Provider value={{position, enabled, error}}>
      {children}
    </GeoLocationContext.Provider>
  );
};

export {GeoLocationContext, GeoLocationProvider};
