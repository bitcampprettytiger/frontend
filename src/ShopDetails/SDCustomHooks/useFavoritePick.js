import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchFavoriteShopsByUserId } from '../../Menu/Home/HomeComponents/HomeApi';

function useFavoritePickAndFavorites() {
    const [favoriteShops, setFavoriteShops] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const memberId = localStorage.getItem('memberId');
    if (!memberId) {
        console.error('memberId가 존재하지 않습니다.');
        // 여기에 추가적인 처리 로직
    }

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        console.error('accessToken이 존재하지 않습니다.');
        // 여기에 추가적인 처리 로직
    }
    const headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${accessToken}`,
    };

    const fetchShopDetail = async (vendorId) => {
        const response = await axios.get(`http://27.96.135.75/api/shopDetail/${vendorId}`, { headers });
        return response.data;
    };

    useEffect(() => {
        if (!memberId || !accessToken) {
            console.log("memberId 또는 accessToken이 존재하지 않습니다.");
            return;
        }

        const fetchFavorites = async () => {
            setLoading(true);
            try {
                const response = await fetchFavoriteShopsByUserId(memberId);
                const favoriteIds = response.data.map(shop => shop.vendorId);
                const shopDetails = await Promise.all(favoriteIds.map(id => fetchShopDetail(id)));
                setFavoriteShops(shopDetails);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [memberId, headers]);

    const toggleFavorite = async (vendorId, isFavorite) => {
        if (!memberId || !accessToken) {
            setError('memberId 또는 accessToken이 존재하지 않습니다.');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            if (isFavorite) {
                await axios.delete(`http://27.96.135.75/api/favoritePick/remove/${vendorId}`, { headers });
                setFavoriteShops(favoriteShops.filter(shop => shop.vendorId !== vendorId));
            } else {
                await axios.post(`http://27.96.135.75/api/favoritePick/add/${vendorId}`, null, { headers });
                const shopDetail = await fetchShopDetail(vendorId);
                setFavoriteShops([...favoriteShops, shopDetail]);
            }
            setLoading(false);
        } catch (err) {
            setError(err.response ? err.response.data : err);
            setLoading(false);
        }
    };

    if (!memberId || !accessToken) {
        return {
            toggleFavorite: () => { },
            favoriteShops: [],
            isLoading: false,
            error: 'memberId 또는 accessToken이 존재하지 않습니다.'
        };
    }

    return { toggleFavorite, favoriteShops, isLoading, error };
}

export default useFavoritePickAndFavorites;
