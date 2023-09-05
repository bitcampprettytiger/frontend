import axios from 'axios';
import { useState, useEffect } from 'react';
import { fetchFavoriteShops, addFavoriteShop, removeFavoriteShop } from '../../Menu/Home/HomeComponents/HomeApi';

function useFavoritePick(setExternalFavoriteShops) {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [internalFavoriteShops, setInternalFavoriteShops] = useState([]);
    const [memberId, setMemberId] = useState(localStorage.getItem('memberId'));


    const favoriteCount = (setExternalFavoriteShops ? setExternalFavoriteShops.length : internalFavoriteShops.length);  // 즐겨찾기 개수


    const accessToken = localStorage.getItem('accessToken');

    const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${accessToken}`,
    };

    const updateFavoriteShops = async () => {
        try {
<<<<<<< HEAD
            const response = await axios.get("http://192.168.0.240:1004/myPage/myFavoriteVendors", { headers });
            if(response.data && Array.isArray(response.data.item)) {
                setFavoriteShops(response.data.item);
=======
            const response = await fetchFavoriteShops();
            if (response.data && Array.isArray(response.data.item)) {  // Array 확인 추가
                setInternalFavoriteShops(response.data.item);

>>>>>>> dfbbd0f7aed48255a114d10846631cf192d41633
            } else {
                console.error("No items found or not an array in the response");
            }
        } catch (err) {
            setError(err.response ? err.response.data : err);
        }
    };


    const toggleFavorite = async (vendorId, isFavorite) => {
        setLoading(true);
        setError(null);
        try {
            let response;
            if (isFavorite) {
<<<<<<< HEAD
                response = await axios.delete(`http://192.168.0.240:1004/api/favoritePick/remove/${vendorId}`, { headers });
            } else {
                response = await axios.post(`http://192.168.0.240:1004/api/favoritePick/add/${vendorId}`, null, { headers });
=======
                response = await removeFavoriteShop(vendorId, headers);
            } else {
                // console.error("No items found or not an array in the response");
                response = await addFavoriteShop(vendorId, headers);  // 이 부분이 추가되어야 합니다.

>>>>>>> dfbbd0f7aed48255a114d10846631cf192d41633
            }
            setLoading(false);
            return response;
        } catch (err) {
            setError(err.response ? err.response.data : err);
            setLoading(false);
            throw err;
        }
    };

    // 처음 로드할 때 즐겨찾기 목록을 가져옵니다.
    // useEffect 수정: 의존성 배열에 updateFavoriteShops 추가
    useEffect(() => {
        if (!memberId) {
            console.error("Member ID is not available in localStorage");
            return;
        }
        updateFavoriteShops();
    }, [memberId]);

    useEffect(() => {
        setMemberId(localStorage.getItem('memberId'));
    }, []);

    return {
        toggleFavorite,
        updateFavoriteShops,
        isLoading,
        error,
        favoriteShops: setExternalFavoriteShops || internalFavoriteShops,
        favoriteCount: setExternalFavoriteShops ? setExternalFavoriteShops.length : internalFavoriteShops.length,

        memberId
    };

}

export default useFavoritePick;
