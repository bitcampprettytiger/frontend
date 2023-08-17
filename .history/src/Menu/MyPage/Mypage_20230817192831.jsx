import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './Mypage.css';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link } from 'react-router-dom';


function Mypage() {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("닉네임");
  const [newNickname, setNewNickname] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    setNewNickname(nickname); // 이전 닉네임을 표시하기 위해
  };

  const handleSaveClick = () => {
    setNickname(newNickname);
    setIsEditing(false);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 2000); // 2초 후 모달을 숨깁니다.
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setNewNickname(e.target.value);
  };

  const reviewCount = 10; // 예시로 사용한 리뷰 수
  const favoriteCount = 5; // 예시로 사용한 찜해찜 수


  return (
    <>
      <div className='App-main2'>
        <Header page="mypage" />
        <div className='mypage-container'>
          {isEditing ? (
            <div className="nickname-edit">
              <input
                type="text"
                value={newNickname}
                onChange={handleChange}
                className="nickname-input"
              />
              <button onClick={handleSaveClick} className="nickname-save-button">변경</button>
              <button onClick={handleCancelClick} className="nickname-cancel-button">취소</button>
            </div>
          ) : (
            <div className="nickname-display">
              <p className="nickname-text">{nickname}</p>
              <button onClick={handleEditClick} className="nickname-edit-button">
                <PlayCircleOutlineIcon />
              </button>
            </div>
          )}

          {showModal && <div className="modal">닉네임이 변경 되었습니다.</div>}

          <Box
            component="div"
            sx={{
              p: 2,
              border: '1px dashed grey',
              width: '100%', // 박스의 너비 설정
              backgroundColor: 'white', // 박스의 배경색 설정
              display: 'flex',
              justifyContent: 'space-between' // 버튼들을 박스 양 끝으로 분리
            }}
          >
            {/* 리뷰 버튼 및 카운트 */}
            <div onClick={() => window.location.href = '/reviews'} style={{ cursor: 'pointer' }}>
              <Button sx={{ border: 'none', textTransform: 'none' }}>리뷰</Button>
              <div>{reviewCount}</div>
            </div>

            {/* 찜해찜 버튼 및 카운트 */}
            <div onClick={() => window.location.href = '/favorites'} style={{ cursor: 'pointer' }}>
              <Button sx={{ border: 'none', textTransform: 'none' }}>찜해찜</Button>
              <div>{favoriteCount}</div>
            </div>
          </Box>

          <div className="button-group">
            <Link to="/myreview">
              <div className="custom-button">
                <img src="/path-to-your-first-image.jpg" alt="Review" className="button-icon" />
                나의 먹자취 리뷰
                <KeyboardArrowRightIcon />
              </div>
            </Link>

            <Link to="/myfavorite">
              <div className="custom-button">
                <img src="/path-to-your-second-image.jpg" alt="Favorites" className="button-icon" />
                내가 찜해찜!
                <KeyboardArrowRightIcon />
              </div>
            </Link>

            <Link to="/mytakeout">
              <div className="custom-button">
                <img src="/path-to-your-third-image.jpg" alt="Order" className="button-icon" />
                포장주문내역
                <KeyboardArrowRightIcon />
              </div>
            </Link>
          </div>

        </div>
        <Footer type="mypage" />
      </div>
    </>
  );
}

export default Mypage;