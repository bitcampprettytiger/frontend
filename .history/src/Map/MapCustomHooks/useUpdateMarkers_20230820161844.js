import { useCallback } from 'react';
const useUpdateMarkers = (map, markers, selectedVendorTypes, vendorInfo) => {
  return () => {

    if (!map) return;

    const bounds = map.getBounds();
    const swLatLng = bounds.getSouthWest();
    const neLatLng = bounds.getNorthEast();

    const newDisplayedMarkers = [];
    markers.forEach((marker, index) => {
      const markerPosition = marker.getPosition();

      if (
        swLatLng.getLat() <= markerPosition.getLat() &&
        markerPosition.getLat() <= neLatLng.getLat() &&
        swLatLng.getLng() <= markerPosition.getLng() &&
        markerPosition.getLng() <= neLatLng.getLng()
      ) {
        if (
          !selectedVendorTypes.length ||
          selectedVendorTypes.includes(vendorInfo[index].vendorType)
        ) {
          marker.setMap(map);
          newDisplayedMarkers.push(marker);
        } else {
          marker.setMap(null);
        }
      } else {
        marker.setMap(null);
      }
    });

    console.log('총 마커: ', markers.length);
    console.log('화면에 나와있는 마커: ', newDisplayedMarkers.length);

  }, [map, markers, selectedVendorTypes, vendorInfo]); // 의존성 배열 추가
};

export default useUpdateMarkers;
