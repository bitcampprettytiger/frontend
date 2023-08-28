import { useState } from 'react';
import axios from 'axios';

function useFavoritePick() {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const toggleFavorite = async (memberId, vendorId, isFavorite) => {
        setLoading(true);
        setError(null);

        try {
            await axios.post(`http://localhost//api/favoritePick/${memberId}/${isFavorite ? 'remove' : 'add'}/${vendorId}`);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    return { toggleFavorite, isLoading, error };
}

export default useFavoritePick;
