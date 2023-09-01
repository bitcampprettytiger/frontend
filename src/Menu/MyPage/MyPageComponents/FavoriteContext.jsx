// FavoriteContext.js
import React, { createContext, useState, useContext } from 'react';

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
    const [favoriteShops, setFavoriteShops] = useState([]);
    const [favoriteCount, setFavoriteCount] = useState(0);

    // 찜한 가게 목록이 변경될 때마다 찜한 가게의 개수도 업데이트
    React.useEffect(() => {
        setFavoriteCount(favoriteShops.length);
    }, [favoriteShops]);

    return (
        <FavoriteContext.Provider value={{ favoriteShops, setFavoriteShops, favoriteCount, setFavoriteCount }}>
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
