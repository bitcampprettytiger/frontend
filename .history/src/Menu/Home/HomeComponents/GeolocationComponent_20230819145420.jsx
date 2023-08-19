import useLocation from './GeolocationCustomHooks/useLocation';
import { fetchAddressFromCoords } from '../../Utils/kakaoUtils';

function GeolocationComponent({ setLocation, setError, setAddress }) {
    const location = useLocation();

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
            <div>주소: {address}</div>
        </div>
    );
}
