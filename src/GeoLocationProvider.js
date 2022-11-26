import React, {createContext, useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {enableLatestRenderer} from 'react-native-maps';

const GeoLocationContext = createContext();

const MAX_ERRORS_COUNT = 10;

const GeoLocationProvider = ({children}) => {
  const [position, setPosition] = useState({});
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState();
  const [errorsCount, setErrorsCount] = useState(0);

  useEffect(() => {
    enableLatestRenderer();
    const id = Geolocation.watchPosition(
      ({coords}) => {
        !enabled && setEnabled(true);
        errorsCount && setErrorsCount(0);
        setPosition(coords);
      },
      e => {
        !error && setError(e);
        enabled && setErrorsCount(errorsCount + 1);
        errorsCount > MAX_ERRORS_COUNT && enabled && setEnabled(false);
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
  }, [enabled, error, errorsCount]);

  return (
    <GeoLocationContext.Provider value={{position, enabled, error}}>
      {children}
    </GeoLocationContext.Provider>
  );
};

export {GeoLocationContext, GeoLocationProvider};
