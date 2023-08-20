import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ShopImage = ({ shop }) => {

    return (
        <>
            <Swiper
                pagination={{
                    type: 'fraction',
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="shopImageSwiper">
                {shop.images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img className='imageSlider' src={image} alt={`shop${index}`} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default ShopImage;
