import React, { useState, useEffect } from 'react';
import Header from '../../../Layout/Header.jsx';

import React, { useState, useEffect } from 'react';

function GeolocationComponent() {
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null
    });
    const [error, setError] = useState(null);
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation은 이 브라우저에서 지원되지 않습니다.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                setLocation({
                    latitude: lat,
                    longitude: lon
                });

                // 위도와 경도를 사용하여 Kakao Maps API 호출
                const geocoder = new window.kakao.maps.services.Geocoder();

                geocoder.coord2Address(lon, lat, (result, status) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                        setAddress(result[0].address.address_name); // 주소 설정
                    }
                });

            },
            (error) => {
                setError(error.message);
            }
        );
    }, []);

    return (
        <div>
            {error ? (
                <div>Error: {error}</div>
            ) : (
                <div>
                    <div>위도: {location.latitude}</div>
                    <div>경도: {location.longitude}</div>
                    <div>주소: {address}</div>
                </div>
            )}
        </div>
    );
}

export default GeolocationComponent;
