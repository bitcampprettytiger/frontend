import { useEffect, useRef } from 'react';

const useSlider = (images) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const swiper = swiperRef.current?.swiper;
      if (swiper) {
        if (swiper.activeIndex === images.length - 1) {
          swiper.slideTo(0);
        } else {
          swiper.slideNext();
        }
      }
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [images]);

  return swiperRef;
};

export default useSlider;
