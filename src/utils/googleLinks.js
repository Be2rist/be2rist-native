import {config} from 'config';
import {createSearchParams} from 'react-router-native';

export const imageLink = id =>
  `https://drive.google.com/uc?export=view&id=${id}`;

export const audioLink = id =>
  `https://docs.google.com/uc?export=download&id=${id}`;

const createGoogleMarker = location =>
  `color:green|label:B|${location._latitude || location.latitude},${
    location._longitude || location.longitude
  }`;

export const googleMapStatic = ({
  zoom = 19,
  location,
  size = {x: 600, y: 300},
  maptype = 'roadmap',
}) =>
  `https://maps.googleapis.com/maps/api/staticmap?${createSearchParams({
    zoom,
    ...(location ? {markers: createGoogleMarker(location)} : {}),
    maptype,
    size: `${size.x}x${size.y}`,
    key: config.GOOGLE_MAP_API_KEY,
  })}`;
