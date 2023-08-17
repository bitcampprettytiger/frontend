import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Map/MapList.css';

export default function MapList({ vendorInfo }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // 한 번에 보여줄 슬라이더의 수를 5개로 설정
    slidesToScroll: 1, // 한 번에 스크롤 할 슬라이더의 수를 1개로 설정
    swipeToSlide: true,
  };

  // handleClick 함수에서는 클릭한 아이템에 따라 필요한 로직을 구현하면 됩니다.
  // 예를 들어, 여기서는 각 지명에 해당하는 위치로 지도를 이동하는 로직을 구현할 수 있습니다.
  const handleClick = (info) => {
    console.log(info); // 클릭한 아이템 출력. 실제로는 원하는 로직을 구현하면 됩니다.
    // 예: moveTo(item);
  };

  return (
    <>
      <Slider {...settings} className="list">
        {vendorInfo.map((info, index) => (
          <div key={index} onClick={() => handleClick(info)}>
            <div className="list-item">
              <span>{info.vendorType}</span>
              <span>{info.vendorOpenStatus}</span>
              <span> {info.vendorTel}</span>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
}
