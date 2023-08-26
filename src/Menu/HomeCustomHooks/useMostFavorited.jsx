// HomeCustomHooks/useMostFavorited.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function useMostFavorited() {
    const [mostFavorited, setMostFavorited] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMostFavorited() {
            try {
                const response = await axios.get('http://27.96.135.75/api/favoritePick/top8Favorites');
                setMostFavorited(response.data.slice(0, 5)); // 상위 5개만 가져옵니다.
            } catch (err) {
                setError(err);
            }
        }

        fetchMostFavorited();
    }, []);

    return [mostFavorited, error];
}

export default useMostFavorited;
