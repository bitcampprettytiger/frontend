import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import shop from '../../DataEx/shop';

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
          <img src={image} alt={`shop${index}`} />
        </SwiperSlide>
      ))}
    </Swiper>
    <div className="shop-info">
        <h2>{shop.name}</h2>
        <p>{shop.description}</p>
        <div className="shop-rating">{shop.ratingAvg}</div>
        <div className="shop-actions">
          <button onClick={handleCall} className='callbtn'>전화하기</button>
          <button className='locationbtn'>위치</button>
        </div>
      </div>
    </>
  );
};

export default ShopImage;
