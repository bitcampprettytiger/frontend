import { useState, useEffect } from 'react';
import { useLocation, convertCoordsToAddress } from '../../Utils/kakaoUtils';

export const useGeolocation = () => {
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const [address, setAddress] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [isPermissionGranted, setIsPermissionGranted] = useState(false); // 상태 변수 추가


    useEffect(() => {
        //권환 확인
        if (navigator.permissions) {
            navigator.permissions.query({ name: 'geolocation' }).then((result) => {
                setIsPermissionGranted(result.state === 'granted');
            });
        }

        if (location && location.lat && location.lng) {
            convertCoordsToAddress(location.lat, location.lng, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    setAddress(result[0].address.address_name);
                } else {
                    setErrorMessage('좌표를 주소로 변환할 수 없습니다.');
                }
                setIsLoading(false);
            });
        } else {
            setErrorMessage('위치 정보를 가져올 수 없습니다.');
            setIsLoading(false);
        }
    }, [location]);

    return { isLoading, isPermissionGranted, errorMessage, location, address };
};
