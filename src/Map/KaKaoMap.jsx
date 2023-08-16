/*global kakao*/
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const KaKaoMap = (props) => {
  const [data, setData] = useState([]);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://27.96.135.75/vendor/info');
        console.log('Server response:', response.data); // 여기서 서버 응답 확인
        setData(response.data.itemlist);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const container = document.getElementById('map');
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const options = {
        center: new kakao.maps.LatLng(lat, lon),
        level: 3,
      };

      const map = new kakao.maps.Map(container, options);
      setMap(map);

      const markerPosition = new kakao.maps.LatLng(lat, lon);
      const marker = new kakao.maps.Marker({ position: markerPosition });
      marker.setMap(map);
    });
  }, []);

  const newMarkers = useMemo(() => {
    if (map && data.length > 0) {
      return data.map((row) => {
        const markerPosition = new kakao.maps.LatLng(
          Number(row.y),
          Number(row.x)
        );
        console.log(row.x);
        let markerImage = new kakao.maps.MarkerImage(
          '../images/ttuck.png',
          new kakao.maps.Size(50, 50)
        );
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        kakao.maps.event.addListener(marker, 'mouseover', function () {
          markerImage = new kakao.maps.MarkerImage(
            '../images/ttuck.png',
            new kakao.maps.Size(55, 55)
          );
          marker.setImage(markerImage);
        });

        kakao.maps.event.addListener(marker, 'mouseout', function () {
          markerImage = new kakao.maps.MarkerImage(
            '../images/ttuck.png',
            new kakao.maps.Size(50, 50)
          );
          marker.setImage(markerImage);
        });

        return marker;
      });
    }
    return [];
  }, [map, data]);

  useEffect(() => {
    setMarkers(newMarkers);
  }, [newMarkers]);

  const updateMarkers = () => {
    if (!map) return;

    const bounds = map.getBounds();
    const swLatLng = bounds.getSouthWest();
    const neLatLng = bounds.getNorthEast();

    const newDisplayedMarkers = [];
    markers.forEach((marker) => {
      const markerPosition = marker.getPosition();

      if (
        swLatLng.getLat() <= markerPosition.getLat() &&
        markerPosition.getLat() <= neLatLng.getLat() &&
        swLatLng.getLng() <= markerPosition.getLng() &&
        markerPosition.getLng() <= neLatLng.getLng()
      ) {
        marker.setMap(map);
        newDisplayedMarkers.push(marker);
      } else {
        marker.setMap(null);
      }
    });

    console.log('Total markers: ', markers.length);
    console.log('Displayed markers: ', newDisplayedMarkers.length);
  };

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
  
  const moveToCurrentPosition = () => {
    // 지도의 중심을 사용자의 현재 위치로 이동시키는 함수
    if (map && currentPosition) { // currentPosition이 null이 아닌지 확인합니다.
      map.setCenter(
        new kakao.maps.LatLng(currentPosition.lat, currentPosition.lon)
      );
      console.log('ge');
    }
  };

  const childrenWithProps = React.Children.map(props.children, (child) =>
    // 각 자식에 moveToCurrentPosition 함수를 전달하는 함수
    React.cloneElement(child,{moveToCurrentPosition})
  );

  return (
    <div style={{ position: 'relative' }}>
      <div id="map" style={{ width: '100%', height: '80vh' }} />
      {childrenWithProps}
    </div>
  );
};

export default KaKaoMap;
