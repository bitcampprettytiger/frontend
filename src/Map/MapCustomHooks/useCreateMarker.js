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

        // sigmenu에 따른 이미지 선택
        let imagePath;
        switch (row.sigmenu) {
          case '분식':
            imagePath = '../images/blackMA.png';
            break;
          case '국물':
            imagePath = '../images/redMa.png';
            break;
          case '볶음':
            imagePath = '../images/readRed.png';
            break;
          case '튀김':
            imagePath = '../images/yellow.png';
            break;
          default:
            imagePath = '../images/bell.png';
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
