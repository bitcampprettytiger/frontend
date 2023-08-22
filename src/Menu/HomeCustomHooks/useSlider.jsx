import { useState, useEffect } from 'react';

function useSlider(images) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    return [currentIndex, setCurrentIndex];
}

export default useSlider;
