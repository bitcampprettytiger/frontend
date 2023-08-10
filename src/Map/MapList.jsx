import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Map/MapList.css';

const list = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']; // 예시 리스트입니다. 실제로는 원하는 데이터를 사용하실 수 있습니다.

export default function MapList() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // 한 번에 보여줄 슬라이더의 수를 5개로 설정
    slidesToScroll: 1, // 한 번에 스크롤 할 슬라이더의 수를 1개로 설정
    swipeToSlide: true,
  };

  // handleClick 함수에서는 클릭한 아이템에 따라 필요한 로직을 구현하면 됩니다.
  // 예를 들어, 여기서는 각 지명에 해당하는 위치로 지도를 이동하는 로직을 구현할 수 있습니다.
  const handleClick = (item) => {
    console.log(item); // 클릭한 아이템 출력. 실제로는 원하는 로직을 구현하면 됩니다.
    // 예: moveTo(item);
  };

  return (
    <>
      <Slider {...settings} className="list">
        {list.map((item, index) => (
          <div
            key={index}
            onClick={() => handleClick(item)}
            style={{ paddingRight: '30px' }} // 항목 오른쪽에 패딩 추가
          >
            <div className="list-item">{item}</div>
          </div>
        ))}
      </Slider>
    </>
  );
}
