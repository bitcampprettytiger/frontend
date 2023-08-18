import React, { useState } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  const [activeButton, setActiveButton] = useState('');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <footer className="App-footer">
      {/* Navigation buttons with images and text */}
      <Link to="/home">
        <button
          className="image-button"
          onClick={() => handleButtonClick('home')}
        >
          <img
            src={
              activeButton === 'home'
                ? '/images/home.png'
                : '/images/grayHome.png'
            }
            alt="홈아이콘"
          />
          <span
            style={{
              fontSize: '16px',
              color: activeButton === 'home' ? '#FF745A' : 'gray',
              fontWeight: activeButton === 'home' ? 'bold' : 'normal',
            }}
          >
            홈
          </span>
        </button>
      </Link>
      <Link to="/stfood">
      <button
        className="image-button"
        onClick={() => handleButtonClick('streetFood')}
      >
        <img
          src={
            activeButton === 'streetFood'
              ? '/images/spoonfork.png'
              : '/images/graySpoon.png'
          }
          alt="길거리음식아이콘"
        />
        <span
          style={{
            fontSize: '16px',
            color: activeButton === 'streetFood' ? '#FF745A' : 'gray',
            fontWeight: activeButton === 'streetFood' ? 'bold' : 'normal',
          }}
        >
          길거리음식
        </span>
      </button>
      </Link>
      <Link to="/trfood">
      <button
        className="image-button"
        onClick={() => handleButtonClick('foodTruck')}
      >
        <img
          src={
            activeButton === 'foodTruck'
              ? 'images/foodcar.png'
              : 'images/grayFoodcar.png'
          }
          alt="푸드트럭아이콘"
        />
        <span
          style={{
            fontSize: '16px',
            color: activeButton === 'foodTruck' ? '#FF745A' : 'gray',
            fontWeight: activeButton === 'foodTruck' ? 'bold' : 'normal',
          }}
        >
          푸드트럭
        </span>
      </button>
      </Link>
      <Link to="/mypage">
      <button
        className="image-button"
        onClick={() => handleButtonClick('myPage')}
      >
        <img
          src={
            activeButton === 'myPage'
              ? 'images/mypage.png'
              : 'images/grayMypage.png'
          }
          alt="마이페이지아이콘"
        />
        <span
          style={{
            fontSize: '16px',
            color: activeButton === 'myPage' ? '#FF745A' : 'gray',
            fontWeight: activeButton === 'myPage' ? 'bold' : 'normal',
          }}
        >
          마이페이지
        </span>
      </button>
      </Link>
    </footer>
  );
}

export default Footer;
