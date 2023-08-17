import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Map/MapList.css';
import { useState, useRef } from 'react';

export default function MapList({ vendorInfo, moveTo }) {
  const [selectedItem, setSelectedItem] = useState(null); // 클릭한 아이템의 인덱스 상태 관리
  const sliderRef = useRef(null); // 슬라이더 ref를 생성합니다.
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // 한 번에 보여줄 슬라이더의 수를 5개로 설정
    slidesToScroll: 1, // 한 번에 스크롤 할 슬라이더의 수를 1개로 설정
    swipeToSlide: true,
    centermode:true,
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
    // 클릭한 아이템의 좌표로 이동
    moveTo({ lat: info.vendorY, lon: info.vendorX });
    sliderRef.current.slickGoTo(index); // 클릭한 슬라이드로 이동
  };

  return (
    <>
      <Slider ref={sliderRef} {...settings} className="list">
        {/* sliderRef를 Slider에 연결 */}
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
