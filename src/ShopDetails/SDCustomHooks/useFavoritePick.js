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
            const response = await fetchFavoriteShops();
            if (response.data && Array.isArray(response.data.item)) {  // Array 확인 추가
                setInternalFavoriteShops(response.data.item);

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
                response = await removeFavoriteShop(vendorId, headers);
            } else {
                // console.error("No items found or not an array in the response");
                response = await addFavoriteShop(vendorId, headers);  // 이 부분이 추가되어야 합니다.

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
