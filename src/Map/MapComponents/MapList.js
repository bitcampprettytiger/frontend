import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import './MapList.css'
export default function MapList({ vendorInfo, moveTo, selectedVendorTypes }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    initialSlide: 1,
  };

  const imageMap = {
    분식: '../images/stfood.png',
    국물: '../images/bung.png',
    볶음: '../images/tako.png',
    튀김: '../images/jeon.png',
  };

  const getImageByVendorType = (vendorType) => {
    return imageMap[vendorType] || '../images/default.png';
  };

  const handleClick = (info, index) => {
    moveTo({ lat: info.vendorY, lon: info.vendorX });
    setSelectedItem(index);
    sliderRef.current.slickGoTo(index - 1);
  };

  return (
    <>
      <Slider ref={sliderRef} {...settings}>
        {vendorInfo
          .filter((info) => {
            return (
              !selectedVendorTypes.length ||
              selectedVendorTypes.includes(info.vendorType)
            );
          })
          .map((info, index) => (
            <div key={index}>
              <Card
                onClick={() => handleClick(info, index)}
                sx={{
                  width: 260,
                  marginBottom: 2,
                  borderColor: selectedItem === index ? 'primary.main' : 'grey.300',
                  borderWidth: 2,
                  borderStyle: 'solid',
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={getImageByVendorType(info.vendorType)}
                  alt={info.vendorType}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {info.vendorType}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {info.vendorOpenStatus}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {info.vendorTel}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
      </Slider>
    </>
  );
}
