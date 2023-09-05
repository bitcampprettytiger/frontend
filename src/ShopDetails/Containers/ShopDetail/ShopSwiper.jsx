import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios';

const ShopImage = ({ vendor }) => {
  const imagesFromVendor = vendor && vendor.vendorImageDTOList;

  return (
    <>
      <Swiper
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="shopImageSwiper"
        style={{ height: '500px' }} // 슬라이더 자체의 높이 설정
      >
        {imagesFromVendor &&
          imagesFromVendor.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                className="imageSlider"
                src={image.url}
                alt={`shop${index}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'fill', // 이미지 비율 유지하면서 컨테이너 꽉 채우기
                }}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default ShopImage;
