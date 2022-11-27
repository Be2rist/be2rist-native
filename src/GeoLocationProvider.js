import React, {createContext, useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {enableLatestRenderer} from 'react-native-maps';

const GeoLocationContext = createContext();

const GeoLocationProvider = ({children}) => {
  const [position, setPosition] = useState({});
  const [initialized, setInitialized] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    if (!initialized) {
      enableLatestRenderer();
      Geolocation.setRNConfiguration({
        distanceFilter: 1,
        desiredAccuracy: {
          ios: 'best',
          android: 'highAccuracy',
        },
        headingOrientation: 'portrait',
        // Android ONLY
        androidProvider: 'auto',
        interval: 1000, // Milliseconds
        fastestInterval: 2000, // Milliseconds
        maxWaitTime: 5000, // Milliseconds
        // IOS ONLY
        allowsBackgroundLocationUpdates: false,
        headingFilter: 1, // Degrees
        pausesLocationUpdatesAutomatically: false,
        showsBackgroundLocationIndicator: true,
      });
      setInitialized(true);
    }
  }, [initialized]);

  useEffect(() => {
    let id;
    if (initialized) {
      id = Geolocation.watchPosition(
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
        },
      );
    }
    return () => {
      if (id) {
        Geolocation.clearWatch(id);
      }
    };
  }, [enabled, error, initialized]);

  return (
    <GeoLocationContext.Provider value={{position, enabled, error}}>
      {children}
    </GeoLocationContext.Provider>
  );
};

export {GeoLocationContext, GeoLocationProvider};
