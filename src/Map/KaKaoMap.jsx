/*global kakao*/
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import MapList from './MapList';

const KaKaoMap = (props) => {
  const [data, setData] = useState([]); // 데이터를 저장할 상태
  const [map, setMap] = useState(null); // 지도를 저장할 상태
  const [markers, setMarkers] = useState([]); // 마커를 저장할 상태
  const [displayedMarkers, setDisplayedMarkers] = useState([]); // 표시되는 마커를 저장할 상태
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lon: 0 }); // 현재 위치를 저장할 상태

  useEffect(() => {
    // 외부 API에서 데이터를 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://openapi.gg.go.kr/Genrestrtmovmntcook?type=json&key=56929defdf8e4a008549bc8c816f7935'
        );

        const items = response.data.Genrestrtmovmntcook[1].row;
        setData(items); // 데이터 상태 업데이트
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData(); // 함수 실행
  }, []); // 컴포넌트가 처음 마운트될 때 한 번만 실행

  useEffect(() => {
    const container = document.getElementById('map'); // 지도를 표시할 DOM 요소

    navigator.geolocation.getCurrentPosition(function (position) {
      // 사용자의 현재 위치를 가져옴
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      setCurrentPosition({ lat, lon }); // 현재 위치 상태 업데이트

      const options = {
        center: new kakao.maps.LatLng(lat, lon), // 지도의 중심
        level: 3, // 지도의 확대 수준
      };

      const map = new kakao.maps.Map(container, options); // 지도 생성
      setMap(map); // 지도 상태 업데이트

      const markerPosition = new kakao.maps.LatLng(lat, lon); // 마커의 위치
      const marker = new kakao.maps.Marker({ position: markerPosition }); // 마커 생성
      marker.setMap(map); // 마커를 지도에 표시
    });
  }, []); // 컴포넌트가 처음 마운트될 때 한 번만 실행

  const newMarkers = useMemo(() => {
    // 새로운 마커를 생성하는 함수
    if (map && data.length > 0) {
      return data.map((row) => {
        const markerPosition = new kakao.maps.LatLng(
          row.REFINE_WGS84_LAT,
          row.REFINE_WGS84_LOGT
        );
        let markerImage = new kakao.maps.MarkerImage(
          '../img/gol.png',
          new kakao.maps.Size(50, 50)
        );
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        // 마커에 마우스오버 이벤트 등록
        kakao.maps.event.addListener(marker, 'mouseover', function () {
          // 마우스오버시 이미지 크기 10% 증가
          markerImage = new kakao.maps.MarkerImage(
            '../img/gol.png',
            new kakao.maps.Size(55, 55) // 크기 10% 증가
          );
          marker.setImage(markerImage);
        });

        // 마커에 마우스아웃 이벤트 등록
        kakao.maps.event.addListener(marker, 'mouseout', function () {
          // 마우스아웃시 이미지 크기 원래대로
          markerImage = new kakao.maps.MarkerImage(
            '../img/gol.png',
            new kakao.maps.Size(50, 50) // 원래 크기
          );
          marker.setImage(markerImage);
        });

        return marker; // 생성된 마커 반환
      });
    }
    return [];
  }, [map, data]);

  useEffect(() => {
    setMarkers(newMarkers); // 마커 상태 업데이트
  }, [newMarkers]); // newMarkers가 변경될 때마다 실행

  const updateMarkers = () => {
    // 지도의 경계 내에 있는 마커만 표시하고, 경계 밖에 있는 마커는 숨기는 함수
    if (!map) return;

    const bounds = map.getBounds(); // 현재 지도의 경계를 가져옴
    const swLatLng = bounds.getSouthWest(); // 지도의 남서쪽 좌표를 가져옴
    const neLatLng = bounds.getNorthEast(); // 지도의 북동쪽 좌표를 가져옴

    const newDisplayedMarkers = []; // 새로 표시될 마커를 저장할 배열
    let hiddenMarkers = 0; // 숨겨질 마커의 수

    for (const marker of markers) {
      const markerPosition = marker.getPosition(); // 마커의 위치를 가져옴

      // 마커의 위치가 지도의 경계 내에 있는지 확인
      if (
        swLatLng.getLat() <= markerPosition.getLat() &&
        markerPosition.getLat() <= neLatLng.getLat() &&
        swLatLng.getLng() <= markerPosition.getLng() &&
        markerPosition.getLng() <= neLatLng.getLng()
      ) {
        newDisplayedMarkers.push(marker); // 마커를 새로 표시될 마커 배열에 추가
      } else {
        marker.setMap(null); // 마커를 지도에서 제거
        hiddenMarkers++; // 숨겨질 마커의 수를 증가
      }
    }

    setDisplayedMarkers(newDisplayedMarkers); // 표시될 마커 상태 업데이트

    console.log('Total markers: ', markers.length);
    console.log('Displayed markers: ', newDisplayedMarkers.length);
    console.log('Hidden markers: ', hiddenMarkers);
  };

  useEffect(() => {
    // 지도의 중심이 변경되거나 줌 레벨이 변경될 때마다 마커를 업데이트하는 함수
    if (map) {
      kakao.maps.event.addListener(map, 'center_changed', updateMarkers);
      kakao.maps.event.addListener(map, 'zoom_changed', updateMarkers);
    }
    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거하는 함수
      if (map) {
        kakao.maps.event.removeListener(map, 'center_changed', updateMarkers);
        kakao.maps.event.removeListener(map, 'zoom_changed', updateMarkers);
      }
    };
  }, [map, updateMarkers]); // map이나 updateMarkers가 변경될 때마다 실행

  useEffect(() => {
    // 지도의 경계 내에 있는 마커만 표시하고, 경계 밖에 있는 마커는 지도에서 제거하는 함수
    for (const marker of markers) {
      marker.setMap(null);
    }
    for (const marker of displayedMarkers) {
      marker.setMap(map);
    }
  }, [map, markers, displayedMarkers]); // map, markers, displayedMarkers가 변경될 때마다 실행

  const moveToCurrentPosition = () => {
    // 지도의 중심을 사용자의 현재 위치로 이동시키는 함수
    if (map) {
      map.setCenter(
        new kakao.maps.LatLng(currentPosition.lat, currentPosition.lon)
      );
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
