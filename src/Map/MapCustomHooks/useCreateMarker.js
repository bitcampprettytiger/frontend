/*global kakao*/

import { useMemo } from 'react';

export const useCreateMarkers = (map, data) => {
  return useMemo(() => {
    if (map && data.length > 0) {
      return data.map((row) => {
        const markerPosition = new kakao.maps.LatLng(
          Number(row.y),
          Number(row.x)
        );

        // 카테고리에 따른 이미지 선택
        let imagePath;
        switch (row.vendorType) {
          case '분식':
            imagePath = '../images/jeon.png';
            break;
          case '중식':
            imagePath = '../images/bung.png';
            break;
          case '일식':
            imagePath = '../images/tako.png';
            break;
          case '양식':
            imagePath = '../images/ttuck.png';
            break;
          default:
            imagePath = '../images/stfood.png';
            break;
        }

        let markerImage = new kakao.maps.MarkerImage(
          imagePath,
          new kakao.maps.Size(50, 50)
        );

        const marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        kakao.maps.event.addListener(marker, 'mouseover', function () {
          markerImage = new kakao.maps.MarkerImage(
            imagePath,
            new kakao.maps.Size(55, 55)
          );
          marker.setImage(markerImage);
        });

        kakao.maps.event.addListener(marker, 'mouseout', function () {
          markerImage = new kakao.maps.MarkerImage(
            imagePath,
            new kakao.maps.Size(50, 50)
          );
          marker.setImage(markerImage);
        });

        return marker;
      });
    }
    return [];
  }, [map, data]);
};
