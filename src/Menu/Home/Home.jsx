import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useLocation은 사용하지 않아 제거
import Header from '../../Layout/Header';
import '../../App.css';
import './Home.css';
import Footer from '../../Layout/Footer';
import MachaSection from '../Home/HomeComponents/MachaSection';
import { BrowserView, MobileView } from 'react-device-detect'



function Home() {

  const navigate = useNavigate();
  const [searchinput, setSearchInput] = useState('');
  const [hotPlaces, setHotPlaces] = useState([]);
  const [nearbyStations, setNearbyStations] = useState([]);
  const [showStations, setShowStations] = useState(false);

  // 검색창 이동 로직
  const handleSearch = () => {
    navigate('/search', { state: { query: searchinput } });
  };


  const navigateToSearch = () => {
    navigate('/search');
  };

  const navigateToHotPlace = (placeName) => {

    navigate('/search');
  };


  const handleButtonClick = (url) => {
    if (url) {
      window.location.href = url; // 해당 URL로 이동
    }
  };



  // 슬라이드 이미지 로직
  const images = [
    '/images/slide-4.png',
    '/images/slide-2.png',
    '/images/slide-3.png'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3초마다 이미지 변경
    return () => clearInterval(interval);
  }, [images.length]);



  return (

    <div className='App-main2'>

      <Header page="home" />

      <div className="slider">
        <img src={images[currentIndex]} alt="슬라이드 이미지" className="slide-image" />
        <div className="dots">
          {images.map((image, index) => (
            <span
              key={index}
              className={`dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="Home-search-container">
        <input
          className="Home-search-input"
          type="text"
          placeholder="지역, 음식, 가게명을 검색해보세요"
          value={searchinput}
          onChange={(e) => setSearchInput(e.target.value)}
          onClick={handleSearch}
        />
        <button className="Home-search-button" onClick={handleSearch}>
          <img src="images/inputsearch.png" alt="Search" />
        </button>
      </div>
      <div className='custom-text-container2'>
        <p className='custom-text'>오늘 이곳은 어때요?</p>
      </div>

      {/*지역별 인기 장소*/}
      <div className="outer-container">
        <div className="inner-container">
          {/* <button onClick={ } className="button-round">
            <span>내주변</span>
          </button>
          {showStations && nearbyStations.slice(0, 10).map((station) => (
            <button key={station.name} className="button-round" style={{ backgroundImage: `url(${station.img})` }}>
              <span>{station.name}</span>
            </button> */}
          {/* ))} */}
        </div>
      </div>
      <div className='custom-text-container2'>
        <p className='custom-text2'>포장마차거리 핫플레이스 BEST</p>
      </div>
      <div className='custom-text-container3'>
        <p className='custom-text3'>지금은 야장이 가장 인기! 먹고가꼬에서 포장마차거리를 확인하세요!</p>
      </div>
      <div className="macha-button-container">
        {["/images/place1.png", "/images/place2.png", "/images/place3.png", "/images/place4.png", "/images/place5.png"].map((image, index) => (
          <button key={image} className="macha-button" onClick={navigateToSearch}>
            <img src={image} alt={`Place ${index + 1}`} />
          </button>
        ))}

      </div>
      <div className='footer-text-container'>
        <div className='footer-text-container-text'>
          <p>
            (주)먹꼬가꼬<br />
            팀명 : 불타는 호랭이<br />
            소속 : 네이버클라우드 풀스텍 과정 (비트캠프 소속)<br />
            사업자등록번호 : 우리 그런거 없음<br />
            개인정보담당 : 안알랴줌<br />
            대표번호 : 000-000-000
          </p>

        </div>
      </div>

      <Footer type="home" />


    </div >

  );
}

export default Home;

