const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;

export const loadKakaoMapsScript = (callback) => {
    const existingScript = document.getElementById('kakaoMapsScript');
    if (!existingScript) {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}`; // 환경 변수를 사용하여 스크립트 주소 설정
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
    return fetch(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lng}&y=${lat}`, {
        headers: {
            'Authorization': `KakaoAK ${KAKAO_API_KEY}`
        }
    })
        .then(response => response.json());
};
