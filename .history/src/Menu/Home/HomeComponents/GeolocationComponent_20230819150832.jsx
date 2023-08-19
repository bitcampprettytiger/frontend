import useLocation from './GeolocationCustomHooks/useLocation';
import { fetchAddressFromCoords } from '../../Uitls/kakaoUtils'; // 경로 수정
import React, { useEffect, useState } from 'react'; // useState 추가

function GeolocationComponent({ setLocation, setError, setAddress }) {
    const location = useLocation();
    const [address, setAddress] = useState(""); // 상태 추가

    useEffect(() => {
        if (location) {
            const { lat, lng } = location;
            fetchAddressFromCoords(lat, lng)
                .then(data => {
                    if (data.documents && data.documents.length > 0) {
                        const detailedAddress = data.documents[0].region_3depth_name;
                        setAddress(detailedAddress);
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
            <div>주소: {address}</div> {/* 이 부분에서 사용된 'address' */}
        </div>
    );
}

export default GeolocationComponent;
