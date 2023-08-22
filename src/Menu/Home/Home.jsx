import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import '../../App.css';
import './Home.css';
import useSlider from '../HomeCustomHooks/useSlider';
import usePopularPlaces from '../HomeCustomHooks/usePopularPlaces';
// import { BrowserView, MobileView } from 'react-device-detect';

function Home() {
  const navigate = useNavigate();
  // 슬라이더 로직
  const images = [
    '/images/slide-4.png',
    '/images/slide-2.png',
    '/images/slide-3.png'
  ];
  const [currentIndex, setCurrentIndex] = useSlider(images);
  const [searchInput, setSearchInput] = useState('');
  // 주소 및 인기 장소 검색 로직.
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({
    latitude: "",
    longitude: ""
  });
  const popularPlaces = usePopularPlaces(address, location);  // custom hook 사용


  const setAddressToHome = (newAddress, newlocation) => {
    setAddress(newAddress)
    setLocation({
      latitude: newlocation.latitude,
      longitude: newlocation.longitude
    });
  };

  useEffect(() => {
    if (address) {
      // Function to set the address received from the useEffec
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [address, images.length]);

  const handleSearch = () => {
    navigate('/search', { state: { query: searchInput } });
  };

  const navigateToSearch = () => {
    navigate('/search');
  };

  const handleButtonClick = (url) => {
    if (url) {
      window.location.href = url;
    }
  };

  return (
    <div className='App-main2'>
      <Header page="home" setAddressToHome={setAddressToHome} />

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
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="Home-search-button" onClick={handleSearch}>
          <img src="images/inputsearch.png" alt="Search" />
        </button>
      </div>

      <p>오늘 이곳은 어때요?</p>
      <div className="outer-container">
        <div className="inner-container">
          {popularPlaces.map((place) => (
            <button key={place.id} className="button-round">
              <img src={place.imageUrl} alt={place.name} className="button-image" />
              <span className="button-text">{place.location}</span>
            </button>
          ))}
        </div>
      </div>

      <p>포장마차거리 핫플레이스 BEST</p>
      <p className="small-text">지금은 야장이 가장 인기! 먹고가꼬에서 포장마차거리를 확인하세요!</p>
      <div className="macha-button-container">
        {["/images/place1.png", "/images/place2.png", "/images/place3.png", "/images/place4.png", "/images/place5.png"].map((image, index) => (
          <button key={index} className="macha-button" onClick={navigateToSearch}>
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
    </div>
  );
}

export default Home;