/*global kakao*/

import { useEffect, useState } from 'react';

const useInitMap = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const container = document.getElementById('map');
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const options = {
        center: new kakao.maps.LatLng(lat, lon),
        level: 3,
      };

      const mapInstance = new kakao.maps.Map(container, options);
      setMap(mapInstance);

      const markerPosition = new kakao.maps.LatLng(lat, lon);
      const marker = new kakao.maps.Marker({ position: markerPosition });
      marker.setMap(mapInstance);
    });
  }, []);

  return map;
};

export default useInitMap;
