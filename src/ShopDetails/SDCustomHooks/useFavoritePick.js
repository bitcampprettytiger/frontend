// React와 axios 라이브러리를 import합니다.
import { useState } from 'react';
import axios from 'axios';


function useFavoritePick() {

    const [isLoading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const accessToken = localStorage.getItem('accessToken');

    const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${accessToken}`,
    };


    const toggleFavorite = async (vendorId, isFavorite) => {
        console.log("찍혀랑!" + vendorId, isFavorite)
        setLoading(true);
        setError(null);
        try {
            let response;
            if (isFavorite) {
                response = await axios.delete(`http://27.96.135.75/api/favoritePick/remove/${vendorId}`, { headers });
            } else {
                response = await axios.post(`http://27.96.135.75/api/favoritePick/add/${vendorId}`, null, { headers });
            }
            setLoading(false);
            return response; // 여기서 응답을 반환합니다.

        } catch (err) {
            setError(err.response ? err.response.data : err);
            setLoading(false);
            throw err; // 에러를 던져 catch 블록에서 잡을 수 있게 합니다.

        }
    };

    return { toggleFavorite, isLoading, error };
}

export default useFavoritePick;
