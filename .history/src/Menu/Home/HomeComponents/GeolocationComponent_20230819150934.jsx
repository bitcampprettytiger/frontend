import useLocation from './GeolocationCustomHooks/useLocation';
import { fetchAddressFromCoords } from '../../Uitls/kakaoUtils';
import React, { useEffect, useState } from 'react';

function GeolocationComponent({ setLocation, setError, setAddress }) {
    const location = useLocation();
    const [address, setLocalAddress] = useState(""); // 상태 변수 이름 변경

    useEffect(() => {
        if (location) {
            const { lat, lng } = location;
            fetchAddressFromCoords(lat, lng)
                .then(data => {
                    if (data.documents && data.documents.length > 0) {
                        const detailedAddress = data.documents[0].region_3depth_name;
                        setLocalAddress(detailedAddress); // setter 변경
                        setAddress(detailedAddress); // 이미 전달된 setAddress 사용
                    }
                })
                .catch(error => {
                    setError(error.message);
                    console.error('Error:', error);
                });
        }
    }, [location, setError, setAddress]);

    return (
        <div>
            <div>위도: {location?.lat}</div>
            <div>경도: {location?.lng}</div>
            <div>주소: {address}</div>
        </div>
    );
}

export default GeolocationComponent;
