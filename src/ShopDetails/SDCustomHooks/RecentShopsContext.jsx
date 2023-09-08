import React, { createContext, useState, useContext } from 'react';

const RecentShopsContext = createContext();

export const RecentShopsProvider = ({ children }) => {
    const [recentShops, setRecentShops] = useState([]);

    const addShopToRecent = (shop) => {
        setRecentShops((prev) => [shop, ...prev]);
    };

    return (
        <RecentShopsContext.Provider value={{ recentShops, addShopToRecent }}>
            {children}
        </RecentShopsContext.Provider>
    );
};

export const useRecentShops = () => {
    const context = useContext(RecentShopsContext);
    if (context === undefined) {
        throw new Error('useRecentShops must be used within a RecentShopsProvider');
    }
    return context;
};
