// usePopularPlaces.js

import { useState, useEffect } from 'react';
import { fetchPopularPlaces, fetchShopsInArea } from '../Home/HomeComponents/HomeApi';

const usePopularPlaces = (initialAddress, initialLocation) => {
    const [popularPlaces, setPopularPlaces] = useState([]);
    const [shopsAroundArea, setShopsAroundArea] = useState([]);

    useEffect(() => {
<<<<<<< HEAD
        if (address && location.latitude && location.longitude) {
            console.log("여기1!1")
            console.log(address)
            console.log(location.latitude)
            console.log(location.longitude)
            console.log("여기!!!!")
            axios.post('http://192.168.0.240:1004/vendor/search', {
                address: address,
                latitude: location.latitude,
                hardness: location.longitude  // 오타 수정됨
            },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    console.log(response)
                    // isSuccess 필드 확인 추가됨
                    if (response.data.isSuccess) {
                        const itemList = Array.isArray(response.data.result.itemlist) ? response.data.result.itemlist : [];
                        setPopularPlaces(itemList);
                    }
                })
                .catch(error => {
                    console.error("Error fetching popular places", error);
                });
        }
    }, [address, location]);  // 종속성 수정됨
=======
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
>>>>>>> dfbbd0f7aed48255a114d10846631cf192d41633

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
