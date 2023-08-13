import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useLocation은 사용하지 않아 제거
import Header from '../Layout/Header';
import '../App.css';
import './Home.css';
// 이렇게 수정하세요.
import MachaSection from './MachaSection';




function Home() {
  // 검색창 이동 로직
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/search', { state: { query: searchTerm } });
  };

  const navigateToHotPlace = (place) => {
    navigate(`/hotplace/${place}`);
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
  const images = [
    '/images/slide-4.png',
    '/images/slide-2.png',
    '/images/slide-3.png'
  ];
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={handleSearch}
        />
        <button className="Home-search-button" onClick={handleSearch}>
          <img src="images/inputsearch.png" alt="Search" />
        </button>
      </div>

      <div className="hashtag-container">
        <button onClick={() => handleHashTagClick('#떡볶이')}>#떡볶이</button>
        <button onClick={() => handleHashTagClick('#붕어빵')}>#붕어빵</button>
        <button onClick={() => handleHashTagClick('#오뎅')}>#오뎅</button>
        <button onClick={() => handleHashTagClick('#포장마차')}>#포장마차</button>
        <button onClick={() => handleHashTagClick('#타코야끼')}>#타코야끼</button>
      </div>


      <h3>오늘 이곳은 어때요?</h3>
      {/*지역별 인기 장소*/}
      <div className="outer-container">
        <div className="inner-container">
          {hotPlaces.map((place) => (
            <button className="button-round" onClick={() => navigateToHotPlace(place.name)}>
              <img src="images/place2.png" alt={place.name} />
              <span>{place.name}</span>
            </button>
          ))}
        </div>
      </div>

      <MachaSection
        title="포장마차거리 핫플레이스 BEST"
        description="지금은 야장이 가장 인기! 먹고가꼬에서 포장마차거리를 확인하세요!"
        imageList={["/images/place1.png", "/images/place2.png", "/images/place3.png", "/images/place4.png", "/images/place5.png"]}
      />
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



    </div >
  );
}

export default Home;
