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

    // favoriteShops의 길이가 변경될 때마다 favoriteCount 업데이트
    useEffect(() => {
        setFavoriteCount(favoriteShops.length);
    }, [favoriteShops]);

    // 컴포넌트 마운트 시에 favoriteShops 업데이트
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
