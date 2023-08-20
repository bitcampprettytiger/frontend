import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Menu/Home/HomeComponents/WaitingModal';
import './Footer.css';

function Footer({ type, activeButton, handleButtonClick, isWaitingDetailFooterType, handleNextClick }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const navigateToNextScreen = () => {
    handleNextClick();
  };

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
      // ... 나머지 버튼들도 이와 유사한 형식으로 추가 ...

    </footer>
  );

  // 여기에서 다른 render 함수들 (renderWaitingFooter, renderWaitingDetailFooter 등) 도 정의합니다.

  const isDefaultFooterType = ['home', 'stfood', 'trfood', 'mypage', 'search', 'myedit', 'myreview', 'myfavorite', 'mytakeout'].includes(type);

  return (
    <div>
      <div className='App-footer'>
        {isDefaultFooterType ? renderDefaultFooter() :
          (type === 'waiting' && renderWaitingFooter()) ||
          (type === 'waitingDetail' && renderWaitingDetailFooter()) ||
          (type === 'submitting' && renderSubmittingFooter()) ||
          (type === 'submitted' && renderSubmittedFooter())
        }
      </div>
      {showModal && <Modal show={showModal} handleClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Footer;
