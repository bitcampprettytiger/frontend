import { useState, useEffect } from 'react';
import axios from 'axios';

function GeolocationComponent() {
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState("");

    useEffect(() => {
        // 위치 정보 가져오기
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                setLocation(coords);

                // Kakao API 호출
                fetchAddressFromCoords(coords.lat, coords.lng);
            },
            (error) => {
                console.error("Error fetching location", error);
            }
        );
    }, []);

    const fetchAddressFromCoords = (lat, lng) => {
        const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;

        axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}&input_coord=WGS84`,
            { headers: { Authorization: `KakaoAK ${KAKAO_API_KEY}` } }
        )
            .then(response => {
                const detailedAddress = response.data.documents[0].address.address_name;
                setAddress(detailedAddress);
            })
            .catch(error => {
                console.error('Error fetching address from coords:', error);
            });
    };

    return (
        <div>
            <div>위도: {location?.lat}</div>
            <div>경도: {location?.lng}</div>
            <div>주소: {address}</div>
        </div>
    );
}

export default GeolocationComponent;
