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
    분식: '../images/roopy.png',
    국물: '../images/bung.png',
    볶음: '../images/tako.png',
    튀김: '../images/jeon.png',
  };

  const handleClick = (info, index) => {
    moveTo({ lat: info.vendorY, lon: info.vendorX });
    setSelectedItem(index);
    console.log(info.vendorid);
  };
  useEffect(() => {
    console.log('가게ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ', vendorInfo);
  });
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
                width: '90%', // 25% - margin
                height: '200px',
                borderColor: selectedItem === index ? '#FD5E53' : 'grey.300',
                borderWidth: 1,
                marginLeft: '5%',
                borderStyle: 'solid',
                transform: selectedItem === index ? 'scale(1.0)' : 'scale(0.9)',
                opacity: selectedItem === index ? 1 : 0.8,
                transition: 'transform 0.3s ease-in-out',
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: '100px', // 실제 높이는 50%
                  objectFit: 'contain', // 이미지 비율 유지
                  objectPosition: 'center', // 중앙 정렬
                  marginBottom:'5%',
                  objectFit: 'cover', // 이미지를 채우되 비율을 유지
                  objectPosition: 'center', // 중앙 정렬
                }}
                image={info.vendorimg}
                alt={info.vendorSIG}
              />
              <CardContent>
                <Typography
                  variant="h8"
                  component="div"
                  sx={{ marginBottom: '5%' }}
                >
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
