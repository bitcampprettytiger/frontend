import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import '../../App.css';
import './Home.css';
import useSlider from '../HomeCustomHooks/useSlider';
import usePopularPlaces from '../HomeCustomHooks/usePopularPlaces';
import useFetchData from '../HomeCustomHooks/useFetchData';
import useMostFavorited from '../HomeCustomHooks/useMostFavorited';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

function Home() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({
    latitude: "",
    longitude: ""
  });

  const images = ['/images/slide-4.png', '/images/slide-2.png', '/images/slide-3.png'];
  const [currentIndex, setCurrentIndex] = useSlider(images);
  const popularPlaces = usePopularPlaces(address, location);
  const [page, setPage] = useState(1);
  const [fetchedData, setFetchedData] = useState([]);
  const fetchResult = useFetchData(`http://27.96.135.75/vendor/search`, 'post', []);
  const bestReviewsResult = useFetchData('http://27.96.135.75/vendor/review/weightedAverageScore', 'get', []);
  const bestReviews = Array.isArray(bestReviewsResult.data) ? bestReviewsResult.data : [];
  const [isLoading, setIsLoading] = useState(false);
  const [mostFavorited, setMostFavorited] = useState([]);

  useEffect(() => {
    if (fetchResult.data) {
      setFetchedData(prevData => [...prevData, ...fetchResult.data]);
      setPage(prevPage => prevPage + 1);
    }
    if (fetchResult.error) {
      console.error("Error fetching data:", fetchResult.error);
    }
  }, [fetchResult]);

  const navigateToDetail = (storeId) => {
    navigate(`/store/${storeId}`);
  };

  const handleSearch = () => {
    navigate('/search', { state: { query: searchInput } });
  };

  const setAddressToHome = (newAddress, newlocation) => {
    setAddress(newAddress);
    setLocation({
      latitude: newlocation.latitude,
      longitude: newlocation.longitude
    });
  };

  const [imageURL, setImageURL] = useState('https://springboot.kr.object.ncloudstorage.com/%EA%B3%A0%EC%95%88.JPG');

  useEffect(() => {
    async function fetchImageUrl() {
      try {
        const response = await axios.get('http://27.96.135.75/vendor/review/weightedAverageScore');
        if (response.data && response.data.url) {
          setImageURL(response.data.url);
        }
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    }
    fetchImageUrl();
  }, []);

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500 && !isLoading) {
        setIsLoading(true);
      }

      if ((window.innerHeight + window.scrollY) < document.body.offsetHeight - 100) {
        document.querySelector('.footer-text-container').style.display = 'none';
      } else {
        document.querySelector('.footer-text-container').style.display = 'block';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && children}
      </div>
    );
  }

  const [streetFoods, setStreetFoods] = useState([]);
  const [foodStalls, setFoodStalls] = useState([]);

  useEffect(() => {
    async function fetchDataByCategory(category, setStateFunction) {
      try {
        const response = await axios.get(`http://27.96.135.75/vendor/search/${category}`);
        setStateFunction(response.data);
      } catch (error) {
        console.error(`Error fetching ${category} data:`, error);
      }
    }
    fetchDataByCategory('streetfoods', setStreetFoods);
    fetchDataByCategory('foodstalls', setFoodStalls);
  }, []);

  useEffect(() => {
    async function fetchMostFavorited() {
      try {
        const response = await axios.get('http://27.96.135.75/api/favoritePick/top8Favorites');
        setMostFavorited(response.data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching most favorited vendors:", error);
      }
    }
    fetchMostFavorited();
  }, []);


  return (
    <div className='App-main2'>
      <Header page="home" setAddressToHome={setAddressToHome} />

      <div className="slider">
        <img src={images[currentIndex]} alt="슬라이드 이미지" className="slide-image" />
        <div className="dots">
          {images.map((image, index) => (
            <span
              key={index}
              className={`dot ${currentIndex === index ? 'active' : ''} `}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="Home-search-container">
        <InputBase
          className="Home-search-input"
          placeholder="지역, 음식, 가게명을 검색해보세요"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          endAdornment={
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          }
        />
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

      <p>이달의 먹자취 리뷰 BEST NO.5</p>
      <p className="small-text">유저들이 추천하는 장소! 생생한 먹자취 후기</p>
      <div className="macha-button-container">
        {mostFavorited.map((store) => (
          <button key={store.id} className="macha-button" onClick={() => navigateToDetail(store.id)}>
            <img src={store.imageUrl} alt={store.name} />
          </button>
        ))}
      </div>


      <p>먹자취가 이번달 추천하는 장소들</p>
      <p className="small-text">이번달 추천 장소는 어디일까? 확인해보세요!</p>
      <div className="macha-button-container">
        {mostFavorited.map((store) => (

          <button key={store.id} className="macha-button" onClick={() => navigateToDetail(store.id)}>
            <img src={store.imageUrl} alt={store.name} />
          </button>
        ))}
      </div>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="길거리음식" {...a11yProps(0)} />
          <Tab label="포장마차" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ul>
          {streetFoods.map(food => (
            <li key={food.id}>{food.name}</li>
          ))}
        </ul>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ul>
          {foodStalls.map(stall => (
            <li key={stall.id}>{stall.name}</li>
          ))}
        </ul>
      </CustomTabPanel>

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