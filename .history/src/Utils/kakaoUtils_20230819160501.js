import { useState, useEffect } from 'react';

const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;

export function useLocation() {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                setLocation(coords);
            },
            (error) => {
                console.error("Error fetching location", error);
            }
        );
    }, []);

    return location;
}

export const loadKakaoMapsScript = (callback) => {
    const existingScript = document.getElementById('kakaoMapsScript');
    if (!existingScript) {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}`;
        script.id = 'kakaoMapsScript';
        document.body.appendChild(script);

        script.onload = () => {
            if (callback) callback();
        };
    }
    if (existingScript && callback) callback();
};

export const convertCoordsToAddress = (lat, lng, callback) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    const coord = new window.kakao.maps.LatLng(lat, lng);
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
};

export const fetchAddressFromCoords = (lat, lng) => {
    return fetch(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}&input_coord=WGS84`, {
        headers: {
            'Authorization': `KakaoAK ${KAKAO_API_KEY}`
        }
    })
        .then(response => response.json());
};
