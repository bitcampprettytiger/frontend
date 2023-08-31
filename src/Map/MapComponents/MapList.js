import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function MapList({ vendorInfo, moveTo }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [filteredVendorInfo, setFilteredVendorInfo] = useState(vendorInfo);
  const sliderRef = useRef(null);
  const location = useLocation();

  const settings = {
    dots: false,
    infinite: false,
    speed: 2000, // 이동 속도
    slidesToShow: Math.min(4, filteredVendorInfo.length), // 4개 또는 그 이하만 출력
    slidesToScroll: 1,
    swipeToSlide: true,
    initialSlide: 0,
    vertical: false,
  };

  useEffect(() => {
    let newFilteredVendorInfo = vendorInfo;
    if (location.pathname.includes('/stfood')) {
      newFilteredVendorInfo = vendorInfo.filter(
        (info) => info.vendorType === '노점'
      );
    } else if (location.pathname.includes('/trfood')) {
      newFilteredVendorInfo = vendorInfo.filter(
        (info) => info.vendorType === '포장마차'
      );
    }
    setFilteredVendorInfo(newFilteredVendorInfo);
  }, [location.pathname, vendorInfo]);

  const imageMap = {
    분식: '../images/stfood.png',
    국물: '../images/bung.png',
    볶음: '../images/tako.png',
    튀김: '../images/jeon.png',
  };

  const handleClick = (info, index) => {
    moveTo({ lat: info.vendorY, lon: info.vendorX });
    setSelectedItem(index);
  };

  return (
    <div
      style={{ position: 'absolute', bottom: '6%', zIndex: 1, width: '100%' }}
    >
      <Slider ref={sliderRef} {...settings}>
        {filteredVendorInfo.map((info, index) => (
          <div key={index}>
            <Card
              onClick={() => handleClick(info, index)}
              sx={{
                width: '100%', // 25% - margin
                height: '100%',
                borderColor:
                  selectedItem === index ? 'primary.main' : 'grey.300',
                borderWidth: 2,
                borderStyle: 'solid',
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  maxHeight: '100px', // 최대 높이는 150px
                  height: '50%', // 실제 높이는 50%
                  objectFit: 'contain', // 이미지 비율 유지
                  objectPosition: 'center', // 중앙 정렬
                }}
                image={imageMap[info.vendorSIG] || '../images/default.png'}
                alt={info.vendorSIG}
              />
              <CardContent>
                <Typography variant="h8" component="div">
                  {info.vendorName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {info.vendorTel}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
}
