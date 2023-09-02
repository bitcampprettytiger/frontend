
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
            // 여기서 즐겨찾기 목록을 가져오는 API를 호출합니다.
            const response = await axios.get("http://192.168.0.240  /api/favoritePick/list", { headers });
            setFavoriteShops(response.data || []);  // 상태를 업데이트합니다.
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
                response = await axios.delete(`http://192.168.0.240  /api/favoritePick/remove/${vendorId}`, { headers });
            } else {
                response = await axios.post(`http://192.168.0.240  /api/favoritePick/add/${vendorId}`, null, { headers });
            }

            // 즐겨찾기 상태가 바뀌었으므로 목록을 업데이트합니다.
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
