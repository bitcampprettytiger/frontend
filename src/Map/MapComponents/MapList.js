import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './MapList.css';
import { useState, useRef } from 'react';

export default function MapList({ vendorInfo, moveTo }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    initialSlide: 1, // 2번째 슬라이드부터 시작
  };

  const imageMap = {
    한식: '../images/stfood.png',
    중식: '../images/bung.png',
    일식: '../images/tako.png',
    분식: '../images/jeon.png',
    양식: '../images/ttuck.png',
    // 다른 카테고리도 이곳에 추가
  };

  // 주어진 vendorType에 해당하는 이미지 경로를 반환하는 함수
  const getImageByVendorType = (vendorType) => {
    return imageMap[vendorType] || '../images/default.png'; // 만약 매핑되지 않은 카테고리라면 기본 이미지를 반환
  };

  const handleClick = (info, index) => {
    moveTo({ lat: info.vendorY, lon: info.vendorX });
    setSelectedItem(index); // 선택한 아이템 인덱스 설정
    sliderRef.current.slickGoTo(index - 1); // 선택한 슬라이드를 2번째 위치로 이동
  };

  return (
    <>
      <Slider ref={sliderRef} {...settings} className="list">
        {vendorInfo.map((info, index) => (
          <div key={index}>
            <div
              className={`list-item ${
                selectedItem === index ? 'selected' : ''
              }`}
              onClick={() => handleClick(info, index)}
            >
              <img
                src={getImageByVendorType(info.vendorType)}
                alt={info.vendorType}
              />
              <div className="info-container">
                <span>{info.vendorType}</span>
                <span>{info.vendorOpenStatus}</span>
                <span>{info.vendorTel}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
}
