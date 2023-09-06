// NicknameContext.js
import React, { createContext, useContext, useState } from 'react';

const NicknameContext = createContext();

export function NicknameProvider({ children }) {
    const [nickname, setNickname] = useState('');

    return (
        <NicknameContext.Provider value={{ nickname, setNickname }}>
            {children}
        </NicknameContext.Provider>
    );
}

export function useNickname() {
    return useContext(NicknameContext);
}
