import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import '../../App.css';
import './Home.css';
import useSlider from '../HomeCustomHooks/useSlider';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import usePopularPlaces from '../HomeCustomHooks/usePopularPlaces';
import {
  fetchPopularPlaces,
  fetchTop5Vendors,
  fetchMostFavoritedVendors,
  fetchTop10RecommendedMenus,
  fetchTop5ReviewVendors
} from '../Home/HomeComponents/HomeApi';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';



function Home() {

  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const [searchInput, setSearchInput] = useState(''); // 검색 인풋 관리
  const [popularPlaces, setPopularPlaces] = useState([]); // 인기 장소 관리
  const [top5Vendors, setTop5Vendors] = useState([]); // Top 5 판매자 관리
  const [mostFavoritedVendors, setMostFavoritedVendors] = useState([]); // 가장 많이 즐겨찾기 된 판매자 관리
  const [top10Menus, setTop10Menus] = useState([]); // Top 5 메뉴 관리
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 이미지 슬라이더의 인덱스
  const [address, setAddress] = useState(""); // 사용자의 주소
  const [location, setLocation] = useState({ latitude: "", longitude: "" }); // 사용자의 위치 (위도, 경도)
  const [top5ReviewVendors, setTop5ReviewVendors] = useState([]); // 이달의 유저 픽 BEST NO.5 판매자 관리
  const [headerText, setHeaderText] = useState(''); // 초기값은 빈 문자열
  const images = ['/images/slide-4.png', '/images/slide-2.png', '/images/slide-3.png']; // 이미지 슬라이더에 사용될 이미지들
  const swiperRef = useSlider(images); //이미지 추가


  // 판매자 상세 페이지로 이동
  const navigateToVendorDetail = (vendorId) => {
    navigate(`/shophome/${vendorId}`);
  };

  // 주소와 위치 정보를 상태에 저장
  const setAddressToHome = (newAddress, newlocation) => {
    setAddress(newAddress);
    setLocation({
      latitude: newlocation.latitude,
      longitude: newlocation.longitude
    });
  };



  // 데이터를 가져와서 상태 설정
  const fetchAndSet = async (fetchFunction, setStateFunction, sliceAmount) => {
    try {
      const response = await fetchFunction();
      console.log(response);
      if (response && response.data && response.data.length > 0) {
        setStateFunction(sliceAmount ? response.data.slice(0, sliceAmount) : response.data);
      }
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    }
  };


  useEffect(() => {
    // 처음에 이달의 유저 픽 BEST NO.5 판매자 데이터를 가져옴
    const fetchDataForReviewVendors = async () => {
      const data = await fetchTop5ReviewVendors();
      if (data) {
        setTop5ReviewVendors(data);
      }
    };
    fetchDataForReviewVendors();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTop5Vendors();
      console.log("Top 5 Vendors:", data);
      //여기 추가함


      if (data) {
        setTop5Vendors(data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // 처음에 Top 5 메뉴 데이터를 가져옴
    const fetchDataForMenus = async () => {
      const data = await fetchTop10RecommendedMenus();
      console.log(data)
      if (data) {
        setTop10Menus(data);
      }
    };
    fetchDataForMenus();

    // 주소나 위치가 변경되면 여러 데이터를 새로 가져옴
    let isMounted = true;
    console.log("fetchPopularPlaces");
    console.log(fetchPopularPlaces(address, location.latitude, location.longitude))
    fetchAndSet(() => fetchPopularPlaces(address, location.latitude, location.longitude), setPopularPlaces);
    const fetchAndSetData = async () => {
      if (address && address !== '') {  // address가 undefined나 빈 문자열이 아닐 경우에만 API 호출
        await fetchAndSet(async () => {
          const response = await fetchPopularPlaces(address, location.latitude, location.longitude);
          setPopularPlaces(response.data.result.itemlist);
          return response.data.result.itemlist;
        }, setPopularPlaces);
        await fetchAndSet(fetchPopularPlaces, setPopularPlaces);
        await fetchAndSet(fetchTop5Vendors, setTop5Vendors);
        await fetchAndSet(fetchMostFavoritedVendors, setMostFavoritedVendors, 5);
        await fetchAndSet(fetchTop10RecommendedMenus, setTop10Menus);
        console.log("popularPlaces" + popularPlaces)
      }
    };



    console.log("fetchAndSetData()" + fetchAndSetData());
    const interval = setInterval(() => {
      if (isMounted) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 3000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [address, location.latitude, location.longitude]);

  // 검색 이벤트 핸들러
  const handleSearch = () => {
    navigate('/search', { state: { query: searchInput } });
  };

  // 검색 페이지로 이동
  const navigateToSearch = () => {
    navigate('/search');
  };

  // 버튼 클릭 이벤트 핸들러
  const handleButtonClick = (areaName) => {
    setHeaderText(`${areaName}지역의 인기 매장 BEST`);
  };
  //메뉴버튼 누르면 검색창이동
  const handleMenuItemClick = (menuText) => {
    navigate(`/search?query=${menuText}`);
  };
  //역버튼 누르면 검색창이동
  const navigateToSearchWithInfo = (areaName, shopsAroundArea) => {
    navigate('/search', {
      state: {
        headerText: `${areaName}지역의 인기 매장 BEST`,
        shops: shopsAroundArea
      }
    });
  };

  return (
    <div className='App-main2'>
      <Header page="home" setAddressToHome={setAddressToHome} />

      <Swiper
        ref={swiperRef}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="Home-search-container">
        <input
          className="Home-search-input"
          type="text"
          placeholder="지역, 음식, 가게명을 검색해보세요"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="Home-search-button" onClick={handleSearch}>
          <SearchOutlinedIcon sx={{color: '#FD5E53'}}/>
        </button>
      </div>

      <p className='title'>오늘 이곳은 어때요?</p>
      <div className="outer-container">
        <div className="inner-container">
          {popularPlaces.map((place) => (
            <button
              key={place.id}
              className="button-round"
              onClick={() => navigateToSearchWithInfo(place.location, place.shopsAround)}
            >
              <img src={place.imageUrl} alt={place.name} className="button-image" />
              <span className="button-text">{place.location}</span>
            </button>
          ))}
        </div>
      </div>

      <p className='title'>이달의 유저 픽 BEST NO.5</p>
      <div className="macha-button-container">
        {top5ReviewVendors.map((vendor) => (
          <button
            key={vendor.id}
            className="macha-button"
            onClick={() => navigateToVendorDetail(vendor.id)}
          >
            <img src={vendor.imageUrl} alt={vendor.name} />
          </button>
        ))}
      </div>

      <p className='title'>먹자취 추천 어쩌구 NO.5</p>
      <div className="macha-button-container">
        {mostFavoritedVendors.map((vendor) => (
          <button
            key={vendor.id}
            className="macha-button"
            onClick={() => navigateToVendorDetail(vendor.id)}
          >
            <img src={vendor.primaryimgurl} alt={vendor.name} />
          </button>
        ))}
      </div>

      <p className='title'>먹자취에서 즐겨 찾는 메뉴</p>
      <div className="favorite-menu-container">
        <div className="menu-box">
          {top10Menus.slice(0, 5).map((menu, index) => (
            <button className="menu-button" key={index} onClick={() => handleMenuItemClick(menu)}>
              <span>{index + 1}위</span>
              {" "}
              <span className='textbar'>|</span>
              {" "}
              <span>{menu}</span>
            </button>
          ))}
        </div>
        <div className="menu-box">
          {top10Menus.slice(5, 10).map((menu, index) => (
            <button className="menu-button" key={index + 5}>
              <span>{index + 6}위</span>
              {" "}
              <span className='textbar'>|</span>
              {" "}
              <span>{menu}</span>
            </button>
          ))}
        </div>
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