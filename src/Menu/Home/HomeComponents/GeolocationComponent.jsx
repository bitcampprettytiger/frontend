import React, { useState, useEffect } from 'react';
import { useLocation, convertCoordsToAddress } from '../../../Utils/kakaoUtils';  // 수정된 부분

function GeolocationComponent() {
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (location.latitude && location.longitude) {
            convertCoordsToAddress(location.latitude, location.longitude, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    setAddress(result[0].address.address_name);
                }
            });
        }
    }, [location]);

    return (
        <div>
            <div>위도: {location?.lat}</div>
            <div>경도: {location?.lng}</div>
            {isLoading ? <div>Loading...</div> : <div>주소: {address}</div>}
        </div>
    );

}

export default GeolocationComponent;
