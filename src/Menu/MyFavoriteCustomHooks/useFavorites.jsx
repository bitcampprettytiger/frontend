// useFavorites.js
import { useState, useEffect } from 'react';
import { fetchFavoriteShopsByUserId } from './HomeApi';

function useFavorites(memberId) {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetchFavoriteShopsByUserId(memberId);
                setFavorites(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [memberId]);  //userId였던것

    return { favorites, loading, error };
}
