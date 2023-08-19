import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Rating } from '@mui/material';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ShopImage = ({ shop }) => {
    const handleCall = () => {
        window.location.href = `tel:${shop.tel}`;
    };

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
            <div className="shop-info">
                <h2>{shop.name}</h2>
                <p>{shop.description}</p>
                <div className="shop-rating">
                    <Rating value={shop.ratingAvg} readOnly />
                </div>
                <div className="shop-actions">
                    <button onClick={handleCall} className='callbtn'>전화하기</button>
                    <button className='locationbtn'>위치</button>
                </div>
            </div>
        </>
    );
};

export default ShopImage;

