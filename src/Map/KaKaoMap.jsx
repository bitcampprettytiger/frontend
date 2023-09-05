/*global kakao*/
import React, { useEffect, useMemo, useState } from 'react';
import { useMapAPI } from './MapCustomHooks/useMapAPI';
import { useCreateMarkers } from './MapCustomHooks/useCreateMarker';
import useUpdateMarkers from './MapCustomHooks/useUpdateMarkers';
import useInitMap from './MapCustomHooks/useInitMap';
import ModalWindos from './MapComponents/ModalWindos';
import { useLocation } from 'react-router-dom';
const KaKaoMap = (props) => {
  const location = useLocation();
  const [markers, setMarkers] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const { data, loading } = useMapAPI('http://192.168.0.240:1004/vendor/info');
  const [selectedVendorTypes, setSelectedVendorTypes] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedSIGmenus, setSelectedSIGmenus] = useState([]);
  const vendorInfo = useMemo(() => {
    if (data) {

      console.log('1222222222222222', data);

      return data.map((vendor) => ({
        vendorName: vendor.vendorName,
        vendorAddress: vendor.address,
        vendorOpenStatus: vendor.vendorOpenStatus,
        vendorType: vendor.vendorType,
        vendorTel: vendor.tel,
        vendorX: vendor.x,
        vendorY: vendor.y,
        vendorSIG: vendor.sigmenu,
        vendorid: vendor.id,
        vendorimg: vendor.primaryimgurl,
      }));
    }
    return [];
  }, [data]);

  console.log(vendorInfo);

  const map = useInitMap();

  const newMarkers = useCreateMarkers(map, data);
  useEffect(() => {
    setMarkers(newMarkers);
  }, [newMarkers]);

  const updateMarkers = useUpdateMarkers(
    map,
    markers,
    selectedVendorTypes,
    vendorInfo,
    selectedSIGmenus
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
    if (location.pathname.includes('stfood')) {
      setSelectedVendorTypes(['노점']);
    } else if (location.pathname.includes('trfood')) {
      setSelectedVendorTypes(['포장마차']);
    } else {
      setSelectedVendorTypes([]); // 다른 조건이 필요하다면 여기에 추가
    }
  }, [location.pathname]);

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

  const toggleSIGmenu = (vendorSIG) => {
    setSelectedSIGmenus((prevSIGmenus) =>
      prevSIGmenus.includes(vendorSIG)
        ? prevSIGmenus.filter((sig) => sig !== vendorSIG)
        : [...prevSIGmenus, vendorSIG]
    );
  };
  const displaySelectedVendorType = () => {
    markers.forEach((marker, index) => {
      const currentVendorInfo = vendorInfo[index];

      const typeMatch = selectedVendorTypes.includes(
        currentVendorInfo.vendorType
      );
      const sigMatch =
        !selectedSIGmenus.length ||
        selectedSIGmenus.includes(currentVendorInfo.vendorSIG);
      if (typeMatch && sigMatch) {
        marker.setMap(map);
      } else {
        marker.setMap(null);
      }
    });
  };
  useEffect(() => {
    displaySelectedVendorType();
  }, [selectedVendorTypes, selectedSIGmenus]);
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

  useEffect(() => {
    markers.forEach((marker, index) => {
      kakao.maps.event.addListener(marker, 'click', () => {
        setSelectedVendor(vendorInfo[index]);
      });
    });
  }, [markers, vendorInfo]);
  console.log(selectedVendor);
  const handleCloseModal = () => {
    setSelectedVendor(null);
  };

  const childrenWithProps = React.Children.map(props.children, (child) =>
    React.cloneElement(child, {
      moveToCurrentPosition,
      vendorInfo,
      moveTo,
      toggleSIGmenu,
      selectedVendorTypes,
      selectedSIGmenus,
    })
  );
  return (
    <div style={{ position: 'relative' }}>
      <div id="map" style={{ width: '100%', height: '90vh' }} />
      {selectedVendor && (
        <ModalWindos info={selectedVendor} onClose={handleCloseModal} />
      )}
      {childrenWithProps}
    </div>
  );
};
export default KaKaoMap;
