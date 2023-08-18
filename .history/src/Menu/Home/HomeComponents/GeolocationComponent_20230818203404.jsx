import React, { useState, useEffect } from 'react';
import Header from '../../../Layout/Header.jsx';

function GeolocationComponent() {
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        // Geolocation API를 지원하는지 확인
        if (!navigator.geolocation) {
            setError('Geolocation은 이 브라우저에서 지원되지 않습니다.');
            return;
        }

        // 위치 정보를 가져오는 함수
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
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
                </div>
            )}
        </div>
    );
}

export default GeolocationComponent;
