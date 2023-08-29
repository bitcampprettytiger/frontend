import React, { useState, useEffect } from 'react';
import { useLocation, convertCoordsToAddress } from '../../Utils/kakaoUtils';

function GeolocationComponent() {
    const [isLoading, setIsLoading] = useState(true); // 초기 로딩 상태 설정
    const location = useLocation();
    const [address, setAddress] = useState("");

    useEffect(() => {
        console.log(process.env.REACT_APP_KAKAO_API_KEY);
        if (location && location.lat && location.lng) {
            convertCoordsToAddress(location.lat, location.lng, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    setAddress(result[0].address.address_name);
                }

                setIsLoading(false);  // 로딩 상태 업데이트
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