import React, { createContext, useState, useContext, useEffect } from 'react';
import useFavoritePick from '../../../ShopDetails/SDCustomHooks/useFavoritePick';

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
    const [favoriteShops, setFavoriteShops] = useState([]); // 초기값 설정
    const {
        updateFavoriteShops,
        toggleFavorite,
        isLoading,
        error
    } = useFavoritePick(setFavoriteShops);

    const [favoriteCount, setFavoriteCount] = useState(0);

    useEffect(() => {
        if (Array.isArray(favoriteShops)) { // 배열 확인
            setFavoriteCount(favoriteShops.length);
        }
    }, [favoriteShops]);

    useEffect(() => {
        updateFavoriteShops();
    }, []);

    return (
        <FavoriteContext.Provider value={{ favoriteShops, setFavoriteShops, favoriteCount, setFavoriteCount, toggleFavorite, isLoading, error }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavorite = () => {
    const context = useContext(FavoriteContext);
    if (!context) {
        throw new Error("useFavorite must be used within a FavoriteProvider");
    }
    return context;
};
