import React, { createContext, useState, useContext } from 'react';
import App from '../../../App';

const NoticeContext = createContext();

export const NoticeProvider = ({ children }) => {
    const [noticeCount, setNoticeCount] = useState(0);

    return (
        <NoticeContext.Provider value={{ noticeCount, setNoticeCount }}>
            {children}
        </NoticeContext.Provider>
    );
};

export const useNotice = () => {
    const context = useContext(NoticeContext);
    if (context === undefined) {
        throw new Error('useNotice must be used within a NoticeProvider');
    }
    return context;
};
