// Footer.js
import './Footer.css';
import React, { useState } from 'react';
import Modal from '../Menu/Home/HomeComponents/Waiting-Modal';
import { Link, useNavigate } from 'react-router-dom';


// function Footer({ type, activeButton, handleButtonClick, isWaitingDetailFooterType, handleNextClick }) 
function Footer({ type, activeButton, handleButtonClick, isWaitingDetailFooterType, handleNextClick }) {

  const navigate = useNavigate();

  const navigateToNextScreen = () => {
    handleNextClick();
  };

  const handleSubmit = () => {
    navigate('/waitingDetail');
  };

  const renderWaitingFooter = () => (
    <footer className="App-footer">
      <button className="text-button" onClick={() => setShowModal(true)}>
        줄서기
      </button>
      <Link to="/takeout">
        <button className="text-button" onClick={() => handleButtonClick && handleButtonClick('takeout')}>
          포장하기
        </button>
      </Link>
    </footer>
  );
  //줄서기 디테일
  const renderWaitingDetailFooter = () => (
    <footer className="App-footer">
      {/* <button className="text-button" onClick={() => navigateToNextScreen()}> */}
      <button className="text-button" onClick={handleNextClick}>

        다음
      </button>
    </footer>
  );

  const renderSubmittingFooter = () => (
    <footer className="App-footer">
      {/* <button className="text-button" onClick={handleSubmit}> */}
      <button className="text-button" onClick={handleNextClick}>

        신청하기
      </button>
    </footer>
  );

  //신청하기 버튼 후 최종화면
  const renderSubmittedFooter = () => (
    <footer className="App-footer">
      <button className="text-button" onClick={() => navigate('/')}>
        닫기
      </button>
      <button className="text-button" onClick={() => {/* TODO: 취소하기 기능 구현 */ }}>
        취소하기
      </button>
    </footer>
  );




  const [showModal, setShowModal] = useState(false);

  const renderDefaultFooter = () => (
    <footer className="App-footer">
      <Link to="/home">
        <button className="image-button" onClick={() => handleButtonClick && handleButtonClick('home')}>

          <img
            src={activeButton === 'home' ? '/images/home.png' : '/images/grayHome.png'}
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
      <Link to="/streetFood">
        <button className="image-button" onClick={() => handleButtonClick && handleButtonClick('streetFood')}>
          <img
            src={activeButton === 'streetFood' ? '/images/spoonfork.png' : '/images/graySpoon.png'}
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
      <Link to="/foodTruck">
        <button className="image-button" onClick={() => handleButtonClick && handleButtonClick('foodTruck')}>
          <img
            src={activeButton === 'foodTruck' ? 'images/foodcar.png' : 'images/grayFoodcar.png'}
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
        <button className="image-button" onClick={() => handleButtonClick && handleButtonClick('mypage')}>
          <img
            src={activeButton === 'myPage' ? 'images/mypage.png' : 'images/grayMypage.png'}
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
  const isDefaultFooterType = ['home', 'stfood', 'trfood', 'mypage', 'search', 'myedit', 'myreview', 'myfavorite', 'mytakeout'].includes(type);


  return (
    <div>
      <div className='App-footer'>
        {isDefaultFooterType ? renderDefaultFooter() :
          (type === 'waiting' && renderWaitingFooter()) ||
          (type === 'waitingDetail' && renderWaitingDetailFooter()) ||
          (type === 'submitting' && renderSubmittingFooter()) || // 여기에 신청하기 버튼 렌더링 추가
          (type === 'submitted' && renderSubmittedFooter())
        }
      </div>
      {showModal && <Modal show={showModal} handleClose={() => setShowModal(false)} />}
    </div>
  );

}

export default Footer;