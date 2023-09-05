// usePopularPlaces.js

import { useState, useEffect } from 'react';
import { fetchPopularPlaces, fetchShopsInArea } from '../Home/HomeComponents/HomeApi';

const usePopularPlaces = (initialAddress, initialLocation) => {
    const [popularPlaces, setPopularPlaces] = useState([]);
    const [shopsAroundArea, setShopsAroundArea] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchPopularPlaces(initialAddress, initialLocation.latitude, initialLocation.longitude);
                if (data) {
                    setPopularPlaces(data);
                }
            } catch (error) {
                console.error('인기 장소를 가져오는 데 실패했습니다:', error);
                // 필요하면, 사용자에게 오류를 보여주기 위한 상태를 설정하세요.
            }
        };
        fetchData();
    }, [initialAddress, initialLocation]);

    const loadShopsInArea = async (areaName) => {
        try {
            const data = await fetchShopsInArea(areaName);
            if (data) {
                setShopsAroundArea(data);
            }
        } catch (error) {
            console.error('지역 내 상점을 가져오는 데 실패했습니다:', error);
            // 필요하면, 사용자에게 오류를 보여주기 위한 상태를 설정하세요.
        }
        return { popularPlaces, loadShopsInArea, shopsAroundArea };
    };
}

export default usePopularPlaces;
