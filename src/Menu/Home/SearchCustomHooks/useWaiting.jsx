// hooks/useWaiting.js

import { useState } from 'react';

export const useWaiting = () => {
    const [showModal, setShowModal] = useState(false);
    const [count, setCount] = useState(0);
    const [screenState, setScreenState] = useState('initial');

    const toggleModal = () => {
        setShowModal(prev => !prev);
    };

    const handleNextClick = () => {
        if (screenState === 'initial') {
            setScreenState('next');
        } else if (screenState === 'next') {
            setScreenState('submitted');
        }
    };

    return {
        showModal,
        count,
        screenState,
        toggleModal,
        handleNextClick,
        setCount
    };
};
