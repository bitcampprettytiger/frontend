/*global kakao*/
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const KaKaoMap = (props) => {
  const [data, setData] = useState([]); // 데이터를 저장할 상태
  const [map, setMap] = useState(null); // 지도를 저장할 상태
  const [markers, setMarkers] = useState([]); // 마커를 저장할 상태
  const [displayedMarkers, setDisplayedMarkers] = useState([]); // 표시되는 마커를 저장할 상태
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lon: 0 }); // 현재 위치를 저장할 상태
  const [circle, setCircle] = useState(null); // 원을 저장할 상태

  const [draggedMarker, setDraggedMarker] = useState(null); // 드래그 중인 마커 상태를 저장할 변수


  
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

      const circle = new kakao.maps.Circle({
        center: markerPosition,
        radius: 300,
        strokeStyle: 'solid', // 테두리 스타일
        fillColor: '#ff0000', // 채우기 색상
        fillOpacity: 0.1, // 채우기 투명도
      });

      circle.setMap(map); // 원을 지도에 표시
      setCircle(circle); // 원 상태 업데이트
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

        // 마커에 클릭 이벤트 등록
        kakao.maps.event.addListener(marker, 'click', function () {
          handleMarkerClick(row.REFINE_WGS84_LAT, row.REFINE_WGS84_LOGT);
        });
        return marker; // 생성된 마커 반환
      });
    }
    return [];
  }, [map, data]);

  useEffect(() => {
    setMarkers(newMarkers); // 마커 상태 업데이트
  }, [newMarkers]); // newMarkers가 변경될 때마다 실행
  // useEffect를 사용하여 SDK 라이브러리 로드
  useEffect(() => {
    if (map) {
      // SDK 라이브러리 로드
      kakao.maps.load(() => {
        // 이후 로드된 라이브러리를 사용한 코드 작성
      });
    }
  }, [map]);

  useEffect(() => {
    if (draggedMarker) {
      kakao.maps.event.addListener(draggedMarker, 'dragend', function () {
        const newPosition = draggedMarker.getPosition();
        const newLat = newPosition.getLat();
        const newLng = newPosition.getLng();
        console.log('드래그한 마커의 새 위치:', newLat, newLng);
        
        // 이후에 새 위치에 대한 로직 추가 가능
      });
    }
  }, [draggedMarker]);

  // updateMarkers 함수
  const updateMarkers = () => {
    if (!map) return;

    const bounds = map.getBounds();
    const swLatLng = bounds.getSouthWest();
    const neLatLng = bounds.getNorthEast();

    const newDisplayedMarkers = [];
    let hiddenMarkers = 0;

    for (const marker of markers) {
      const markerPosition = marker.getPosition();

      if (kakao.maps.geometry) {
        // SDK 라이브러리가 로드되었을 때만 실행
        const distance = kakao.maps.geometry.distance(
          circle.getCenter(),
          markerPosition
        );

        if (distance <= circle.getRadius()) {
          newDisplayedMarkers.push(marker);
        } else {
          marker.setMap(null);
          hiddenMarkers++;
        }
      }
    }

    setDisplayedMarkers(newDisplayedMarkers);
    console.log('----------------------');
    console.log('총 마커: ', markers.length);
    console.log('보여지는 마커: ', newDisplayedMarkers.length);
    console.log('숨겨지는 마커: ', hiddenMarkers);
    console.log('----------------------');
    <br></br>;
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

  const handleLocationButtonClick = (lat, lon) => {
    if (map) {
      map.setCenter(new kakao.maps.LatLng(lat, lon));
    }
  };

  const handleMarkerClick = (lat, lon) => {
    if (map) {
      map.setCenter(new kakao.maps.LatLng(lat, lon));
      const clickedMarker = markers.find(marker => {
        const markerPosition = marker.getPosition();
        return markerPosition.getLat() === lat && markerPosition.getLng() === lon;
      });
      if (clickedMarker) {
        setDraggedMarker(clickedMarker); // 클릭한 마커를 드래그 중인 마커로 설정
        // 이후에 드래그 중인 마커의 이동을 처리하는 로직 추가 가능
      }
    }
  };
  const childrenWithProps = React.Children.map(props.children, (child) =>
    React.cloneElement(child, {
      moveToCurrentPosition,
      handleLocationButtonClick,
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
