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

                // 주어진 Kakao Maps API 코드를 통합
                fetch(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lon}&y=${lat}`, {
                    headers: {
                        'Authorization': `KakaoAK ddb1eb7f703ace3c1eb27cbf0df39b9a`
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data); // 여기에 추가

                        if (data.documents && data.documents.length > 0) {
                            const detailedAddress = data.documents[0].region_3depth_name;
                            setAddress(detailedAddress);
                        }
                    })
                    .catch(error => console.error('Error:', error));

            },
            (geoError) => {
                setError(geoError.message);
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
