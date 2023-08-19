function GeolocationComponent({ setLocation, setError, setAddress, address }) {
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
