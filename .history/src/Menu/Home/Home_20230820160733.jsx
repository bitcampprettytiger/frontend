<<<<<<< HEAD
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
=======

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useLocation은 사용하지 않아 제거
>>>>>>> eb9913a7fd4e91db25de283ac5a09ad6a517be01
import Header from '../../Layout/Header';
import '../../App.css';
import './Home.css';
import Footer from '../../Layout/Footer';
<<<<<<< HEAD
import { BrowserView, MobileView } from 'react-device-detect';

function Home() {
  const navigate = useNavigate();
  const [searchinput, setSearchInput] = useState('');
  const [hotPlaces, setHotPlaces] = useState([]);
  const [nearbyStations, setNearbyStations] = useState([]);
  const [showStations, setShowStations] = useState(false);
  const [popularPlaces, setPopularPlaces] = useState([]);

  useEffect(() => {
    const testData = {
      address: "서울 송파구 오금로 420" // 이 부분을 원하는 테스트 주소로 변경하실 수 있습니다.
    };



    axios.post('http://192.168.100.233/search', testData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }) // 실제 api 엔드포인트로 변경할 것
      .then(response => {
        console.log(response);
        setPopularPlaces(response.data);
      })
      .catch(error => {
        console.error("Error fetching popular places", error);
      });
  }, []);

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
      window.location.href = url;
    }
  };


=======


function Home() {
  // 검색창 이동 로직
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/search', { state: { query: searchTerm } });
  };


  const navigateToSearch = () => {
    navigate('/search');  // '/search'로 이동 설정
  };

  const navigateToHotPlace = (placeName) => {
    // 장소별로 원하시는 경로에 따라 수정할 수 있습니다.
    navigate('/search');  // 예: '/hot-place/Place1'
  };



  const handleButtonClick = (url) => {
    if (url) {
      window.location.href = url; // 해당 URL로 이동
    }
  };

  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가
  // 해시태그 클릭 핸들러
  const handleHashTagClick = (tag) => {
    // setSearchInput(tag); // 검색어를 해시태그로 설정
    // handleSearchClick(); // 검색 수행
    setSearchTerm(tag); // setSearchTerm으로 검색어 설정
    handleSearch(); // 검색 수행
  };
  const handleHashTagInputChange = (tag) => {
    setSearchTerm(tag);
  };

  // 슬라이드 이미지 로직
>>>>>>> eb9913a7fd4e91db25de283ac5a09ad6a517be01
  const images = [
    '/images/slide-4.png',
    '/images/slide-2.png',
    '/images/slide-3.png'
  ];
<<<<<<< HEAD
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);
=======
  const [hotPlaces, setHotPlaces] = useState([
    { name: "Place1", img: "/path/to/image1.jpg" },
    // ... 다른 장소들
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3초마다 이미지 변경
    return () => clearInterval(interval); // 컴포넌트가 unmount될 때 interval 제거
  }, [images.length]); // images.length가 변경될 때만 효과 재실행



>>>>>>> eb9913a7fd4e91db25de283ac5a09ad6a517be01

  return (
    <div className='App-main2'>
      <Header page="home" />
<<<<<<< HEAD
=======

>>>>>>> eb9913a7fd4e91db25de283ac5a09ad6a517be01
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
<<<<<<< HEAD
=======

>>>>>>> eb9913a7fd4e91db25de283ac5a09ad6a517be01
      <div className="Home-search-container">
        <input
          className="Home-search-input"
          type="text"
          placeholder="지역, 음식, 가게명을 검색해보세요"
<<<<<<< HEAD
          value={searchinput}
          onChange={(e) => setSearchInput(e.target.value)}
=======
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
>>>>>>> eb9913a7fd4e91db25de283ac5a09ad6a517be01
          onClick={handleSearch}
        />
        <button className="Home-search-button" onClick={handleSearch}>
          <img src="images/inputsearch.png" alt="Search" />
        </button>
      </div>
<<<<<<< HEAD
      <div className='custom-text-container2'>
        <p className='custom-text'>오늘 이곳은 어때요?</p>
      </div>

      <div className="outer-container">
        <div className="inner-container">
          {popularPlaces.map((place) => (
            <button key={place.id} className="button-round">
              <img src={place.imageUrl} alt={place.name} className="button-image" />
              <span className="button-text">{place.name}</span>
=======

      <h3>오늘 이곳은 어때요?</h3>
      {/*지역별 인기 장소*/}
      <div className="outer-container">
        <div className="inner-container">
          {hotPlaces.map((place) => (
            <button className="button-round" onClick={() => navigateToHotPlace(place.name)}>
              <img src="images/place2.png" alt={place.name} />
              <span>{place.name}</span>
>>>>>>> eb9913a7fd4e91db25de283ac5a09ad6a517be01
            </button>
          ))}
        </div>
      </div>
<<<<<<< HEAD

      <div className='custom-text-container2'>
        <p className='custom-text2'>포장마차거리 핫플레이스 BEST</p>
      </div>
      <div className='custom-text-container3'>
        <p className='custom-text3'>지금은 야장이 가장 인기! 먹고가꼬에서 포장마차거리를 확인하세요!</p>
      </div>
      <div className="macha-button-container">
        {["/images/place1.png", "/images/place2.png", "/images/place3.png", "/images/place4.png", "/images/place5.png"].map((image, index) => (
          <button key={image} className="macha-button" onClick={navigateToSearch}>
=======
      <h3>포장마차거리 핫플레이스 BEST</h3>
      <p>지금은 야장이 가장 인기! 먹고가꼬에서 포장마차거리를 확인하세요!</p>
      <div className="macha-button-container">
        {["/images/place1.png", "/images/place2.png", "/images/place3.png", "/images/place4.png", "/images/place5.png"].map((image, index) => (
          <button key={index} className="macha-button" onClick={navigateToSearch}>
>>>>>>> eb9913a7fd4e91db25de283ac5a09ad6a517be01
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
<<<<<<< HEAD
        </div>
      </div>
      <Footer type="home" />
    </div>
=======

        </div>
      </div>

      <Footer type="home" />


    </div >
>>>>>>> eb9913a7fd4e91db25de283ac5a09ad6a517be01
  );
}

export default Home;
<<<<<<< HEAD
=======

>>>>>>> eb9913a7fd4e91db25de283ac5a09ad6a517be01