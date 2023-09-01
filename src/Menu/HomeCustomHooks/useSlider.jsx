import { useState, useEffect } from 'react';

function useSlider(images = []) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!Array.isArray(images)) {
            console.error('The provided images are not an array!');
            return;
        }

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images]);

    return [currentIndex, setCurrentIndex];
}

export default useSlider;
