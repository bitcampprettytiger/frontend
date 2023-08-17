/*global kakao*/
import React, { useEffect, useMemo, useState } from 'react';
import { useMapAPI } from './MapCustomHooks/useMapAPI';
import { useCreateMarkers } from './MapCustomHooks/useCreateMarker';
import useUpdateMarkers from './MapCustomHooks/useUpdateMarkers';
import useInitMap from './MapCustomHooks/useInitMap';

const KaKaoMap = (props) => {
  const [markers, setMarkers] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const { data, loading } = useMapAPI('http://27.96.135.75/vendor/info');
  const [selectedVendorTypes, setSelectedVendorTypes] = useState([]);
  const vendorInfo = useMemo(() => {
    if (data) {
      return data.map((vendor) => ({
        vendorOpenStatus: vendor.vendorOpenStatus,
        vendorType: vendor.vendorType,
        vendorTel: vendor.tel,
        vendorX: vendor.x,
        vendorY: vendor.y,
      }));
    }
    return [];
  }, [data]);
  const map = useInitMap();

  const newMarkers = useCreateMarkers(map, data);
  useEffect(() => {
    setMarkers(newMarkers);
  }, [newMarkers]);

  const updateMarkers = useUpdateMarkers(
    map,
    markers,
    selectedVendorTypes,
    vendorInfo
  );

  useEffect(() => {
    if (map) {
      updateMarkers();
      kakao.maps.event.addListener(map, 'center_changed', updateMarkers);
      kakao.maps.event.addListener(map, 'zoom_changed', updateMarkers);
    }
    return () => {
      if (map) {
        kakao.maps.event.removeListener(map, 'center_changed', updateMarkers);
        kakao.maps.event.removeListener(map, 'zoom_changed', updateMarkers);
      }
    };
  }, [map, updateMarkers]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPosition({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }, []);

  const moveTo = (coordinates) => {
    if (map && coordinates) {
      const { lat, lon } = coordinates;
      map.setCenter(new kakao.maps.LatLng(lat, lon));
      console.log('Moved to selected vendor');
    }
  };

  const toggleVendorType = (vendorType) => {
    setSelectedVendorTypes((prevTypes) =>
      prevTypes.includes(vendorType)
        ? prevTypes.filter((type) => type !== vendorType)
        : [...prevTypes, vendorType]
    );
  };

  const displaySelectedVendorType = () => {
    markers.forEach((marker, index) => {
      if (
        !selectedVendorTypes.length ||
        selectedVendorTypes.includes(vendorInfo[index].vendorType)
      ) {
        marker.setMap(map);
      } else {
        marker.setMap(null);
      }
    });
  };

  useEffect(() => {
    displaySelectedVendorType();
  }, [selectedVendorTypes]);

  const moveToCurrentPosition = () => {
    if (map) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        map.setCenter(new kakao.maps.LatLng(lat, lon));
        console.log('Moved to current position');
      });
    }
  };

  const childrenWithProps = React.Children.map(props.children, (child) =>
    React.cloneElement(child, {
      moveToCurrentPosition,
      vendorInfo,
      moveTo,
      toggleVendorType,
      selectedVendorTypes,
    })
  );

  return (
    <div style={{ position: 'relative' }}>
      <div id="map" style={{ width: '100%', height: '80vh' }} />
      {childrenWithProps}
    </div>
  );
};
export default KaKaoMap;