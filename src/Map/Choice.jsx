import React, { useState } from 'react';
import './Choice.css';

const Choice = ({ moveToCurrentPosition, handleLocationButtonClick }) => {
  const handleImageClick = () => {
    // 이미지 클릭 시 실행할 로직을 여기에 작성
    moveToCurrentPosition(); // 현재 위치로 이동하도록 구현
  };

  const [searchValue, setSearchValue] = useState(''); // 검색 입력 값을 저장하는 상태

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchButtonClick = () => {
    // 검색 값을 기반으로 버튼 클릭하는 로직 실행
    const locationButton = findLocationButton(searchValue);
    if (locationButton) {
      locationButton.click();
    } else {
      alert("데이터 없어요")
    }
  };

  const findLocationButton = (locationName) => {
    // 입력한 지역 이름에 해당하는 버튼을 찾아 반환
    const buttons = document.querySelectorAll('.flex-wrap button');
    for (const button of buttons) {
      if (button.textContent === locationName) {
        return button;
      }
    }
    return null;
  };

  return (
    <div className='full'>
      <div className="menu-wrap">
        <div className="cate" onClick={handleImageClick}>
          <img src='images/stfood.png' alt="Category" className='mylocation11'></img>
        </div>
        <input
          className="input"
          placeholder="지역 검색"
          value={searchValue}
          onChange={handleSearchInputChange}
        />
        <button className="search-button" onClick={handleSearchButtonClick}>
          검색
        </button>
      </div>
      <div className="flex-wrap">
        <button className="o" onClick={() => handleLocationButtonClick(37.2236, 127.2060)}>화성</button>
        <button className="t" onClick={() => handleLocationButtonClick(37.6583, 126.8329)}>고양</button>
        <button className="tr" onClick={() => handleLocationButtonClick(36.9907, 127.0828)}>평택</button>
        <button className="f" onClick={() => handleLocationButtonClick(36.4801, 127.2892)}>세종</button>
      </div>
    </div>
  );
};

export default Choice;
