export const loadKakaoMapsScript = (callback) => {
    const existingScript = document.getElementById('kakaoMapsScript');
    if (!existingScript) {
        const script = document.createElement('script');
        script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY&autoload=false';
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
