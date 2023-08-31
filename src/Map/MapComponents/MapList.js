import React, { useState, useRef,useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
export default function MapList({
  vendorInfo,
  moveTo,
  selectedVendorTypes,
  selectedSIGmenus,
}) {
  const [selectedItem, setSelectedItem] = useState(null);
  const sliderRef = useRef(null);
  const [filteredVendorInfo, setFilteredVendorInfo] = useState(vendorInfo);
  const location = useLocation();

  const settings = {
    dots: false,
    infinite: filteredVendorInfo.length > 1, // 이 부분을 수정
    speed: 500,
    slidesToShow:
      filteredVendorInfo.length > 1
        ? Math.min(4, filteredVendorInfo.length)
        : 1,
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
  const getImageByVendorType = (vendorSIG) => {
    // vendorType을 vendorSIG로 변경
    return imageMap[vendorSIG] || '../images/default.png';
  };

  const handleClick = (info, index) => {
    moveTo({ lat: info.vendorY, lon: info.vendorX });
    setSelectedItem(index);
    sliderRef.current.slickGoTo(index - 1);
  };

  return (
    <>
      <div
        style={{ position: 'absolute', bottom: '6%', zIndex: 1, width: '100%' }}
      >
        <Slider ref={sliderRef} {...settings}>
          {filteredVendorInfo.map((info, index) => (
            <div key={index} style={{ width: '25%' }}>
              <Card
                onClick={() => handleClick(info, index)}
                sx={{
                  width: '100%', // 1/4로 설정
                  height: 200, // 높이 200px
                  marginBottom: 2,
                  borderColor:
                    selectedItem === index ? 'primary.main' : 'grey.300',
                  borderWidth: 2,
                  borderStyle: 'solid',
                }}
              >
                <CardMedia
                  component="img"
                  height="50%" // 이미지 높이를 30%로 설정
                  image={getImageByVendorType(info.vendorSIG)}
                  alt={info.vendorSIG}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
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
    </>
  );
}
