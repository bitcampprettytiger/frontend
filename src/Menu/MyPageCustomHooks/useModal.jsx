import { useState } from 'react';

function useModal() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentReview, setCurrentReview] = useState(null);

    const handleOpen = (review) => {
        setCurrentReview(review);
        setModalOpen(true);
    };

    const handleClose = () => {
        setCurrentReview(null);
        setModalOpen(false);
    };

    return {
        isModalOpen,
        currentReview,
        handleOpen,
        handleClose
    };
}

export default useModal;
