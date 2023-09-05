
import axios from 'axios';
import { useState, useEffect } from 'react';

function useFavoritePick() {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [favoriteShops, setFavoriteShops] = useState([]);  // 즐겨찾기 목록
    const favoriteCount = favoriteShops.length;  // 즐겨찾기 개수

    const accessToken = localStorage.getItem('accessToken');
    const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${accessToken}`,
    };

    const updateFavoriteShops = async () => {
        try {
            const response = await axios.get("http://192.168.0.240:1004/myPage/myFavoriteVendors", { headers });
            if(response.data && Array.isArray(response.data.item)) {
                setFavoriteShops(response.data.item);
            } else {
                console.error("API response does not contain an item array:", response.data);
                setFavoriteShops([]);
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
                response = await axios.delete(`http://192.168.0.240:1004/api/favoritePick/remove/${vendorId}`, { headers });
            } else {
                response = await axios.post(`http://192.168.0.240:1004/api/favoritePick/add/${vendorId}`, null, { headers });
            }

            // 목록 업데이트
            await updateFavoriteShops();

            setLoading(false);
            return response;
        } catch (err) {
            setError(err.response ? err.response.data : err);
            setLoading(false);
            throw err;
        }
    };

    // 처음 로드할 때 즐겨찾기 목록을 가져옵니다.
    useEffect(() => {
        updateFavoriteShops();
    }, []);

    return { toggleFavorite, isLoading, error, favoriteShops, favoriteCount };
}

export default useFavoritePick;
