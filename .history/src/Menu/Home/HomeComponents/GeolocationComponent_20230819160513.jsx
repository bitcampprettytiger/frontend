import React, { useState, useEffect } from 'react';
import useLocation, { convertCoordsToAddress } from '../../../Utils/kakaoUtils';

function GeolocationComponent() {
    const location = useLocation();
    const [address, setAddress] = useState("");

    useEffect(() => {
        if (location) {
            convertCoordsToAddress(location.lat, location.lng, (result, status) => {
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
            <div>주소: {address}</div>
        </div>
    );
}

export default GeolocationComponent;
