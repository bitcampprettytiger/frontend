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


        setLoading(true);

        setError(null);
        try {

            if (isFavorite) {
                await axios.delete(`http://27.96.135.75/api/favoritePick/remove/${vendorId}`, { headers });
            } else {

                await axios.post(`http://27.96.135.75/api/favoritePick/add/${vendorId}`, null, { headers });
            }

            setLoading(false);
        } catch (err) {
            setError(err.response ? err.response.data : err);
            setLoading(false);
        }
    };

    return { toggleFavorite, isLoading, error };
}

export default useFavoritePick;
