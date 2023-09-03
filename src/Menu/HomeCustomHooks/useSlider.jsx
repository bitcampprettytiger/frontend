import { useEffect, useRef } from 'react';

const useSlider = (images) => {
    const swiperRef = useRef(null);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        const swiper = swiperRef.current?.swiper;
        if (swiper) {
          swiper.slideNext();
        }
      }, 3000);
  
      return () => {
        clearInterval(intervalId);
      };
    }, []);
  
    return swiperRef;
  };

export default useSlider;