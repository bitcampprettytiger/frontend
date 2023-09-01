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
          className="shopImageSwiper">
          {imagesFromVendor &&
            imagesFromVendor.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  className="imageSlider"
                  src={image.url}
                  alt={`shop${index}`}
                style={{width:'100%'}}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </>
    );
  };
  
  export default ShopImage;
