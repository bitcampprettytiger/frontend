import React, { useState, useEffect } from 'react';

function GeolocationComponent({ setLocation, setError, setAddress }) {
    const [geoLocation, setGeoLocation] = useState({ latitude: null, longitude: null });

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation은 이 브라우저에서 지원되지 않습니다.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                setGeoLocation({
                    latitude: lat,
                    longitude: lon
                });

                setLocation({
                    latitude: lat,
                    longitude: lon
                });

                fetch(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lon}&y=${lat}`, {
                    headers: {
                        'Authorization': `KakaoAK 70e625c44b2f70b848da3e50437a8f60`
                    }
                })
                    .then(response => response.json())
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

            },
            (geoError) => {
                setError(geoError.message);
            }
        );
    }, [setLocation, setError, setAddress]);

    return (
        <div>
            <div>위도: {geoLocation.latitude}</div>
            <div>경도: {geoLocation.longitude}</div>
            <div>주소: {address}</div>
        </div>
    );
}

export default GeolocationComponent;

// ParentComponent는 별도의 파일로 또는 동일한 파일의 바깥쪽에 위치해야 합니다.
function ParentComponent() {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [error, setError] = useState(null);
    const [address, setAddress] = useState('');

    return (
        <div>
            <GeolocationComponent
                setLocation={setLocation}
                setError={setError}
                setAddress={setAddress}
            />
            {/* 헤더 컴포넌트를 여기에 추가하고 location과 address를 props로 전달할 수 있습니다. */}
        </div>
    );
}
