/*global kakao*/
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useMapAPI } from './MapCustomHooks/useMapAPI';
import { useCreateMarkers } from './MapCustomHooks/useCreateMarker';
import useUpdateMarkers from './MapCustomHooks/useUpdateMarkers';
import useInitMap from './MapCustomHooks/useInitMap';

const KaKaoMap = (props) => {
  const [markers, setMarkers] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const { data, loading } = useMapAPI('http://27.96.135.75/vendor/info'); //API 커스텀 훅

  // 맵 초기화
  const map = useInitMap();

  // 마커 생성 시작
  const newMarkers = useCreateMarkers(map, data);
  useEffect(() => {
    setMarkers(newMarkers);
  }, [newMarkers]);


  // 업데이트 마커
  const updateMarkers = useUpdateMarkers(map, markers);

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
      // 현재 위치를 가져오면, currentPosition 상태를 업데이트합니다.
      setCurrentPosition({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }, []);


  // 자식 프롭스 관련 함수
  const moveToCurrentPosition = () => {
    // 지도의 중심을 사용자의 현재 위치로 이동시키는 함수
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
    // 각 자식에 moveToCurrentPosition 함수를 전달하는 함수
    React.cloneElement(child, { moveToCurrentPosition })
  );

  return (
    <div style={{ position: 'relative' }}>
      <div id="map" style={{ width: '100%', height: '80vh' }} />
      {childrenWithProps}
    </div>
  );
};

export default KaKaoMap;
