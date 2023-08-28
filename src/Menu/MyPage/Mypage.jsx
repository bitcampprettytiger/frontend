import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './Mypage.css';
import Footer from '../../Layout/Footer';
import Header from '../../Layout/Header';
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

  const [reviewCount, setReviewCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    // 예: API 호출을 사용하여 리뷰와 찜해찜의 게시물 수를 가져옵니다.
    // 이 부분은 실제 백엔드 서비스와의 통신을 기반으로 작성해야 합니다.
    fetch('/api/user/reviews/count')
      .then(res => res.json())
      .then(data => setReviewCount(data.count));

    fetch('/api/user/favorites/count')
      .then(res => res.json())
      .then(data => setFavoriteCount(data.count));
  }, []); // 컴포넌트가 마운트될 때만 API 호출을 수행합니다.
  //찜하기추가
  const addFavorite = (memberId, vendorId) => {
    fetch(`/api/favoritePick/${memberId}/add/${vendorId}`, {
      method: 'POST',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add favorite');
        }
        return response.json();
      })
      .then(data => {
        console.log("Favorite added:", data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }
  //찜하기 삭제
  const removeFavorite = (memberId, vendorId) => {
    fetch(`/api/favoritePick/${memberId}/remove/${vendorId}`, {
      method: 'POST',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to remove favorite');
        }
        return response.json();
      })
      .then(data => {
        console.log("Favorite removed:", data);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }


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
            <div style={{ cursor: 'pointer' }}>
              <Link to="/myreview">
                <Button sx={{ border: 'none', textTransform: 'none' }}>리뷰</Button>
                <div>{reviewCount}</div>
              </Link>
            </div>

            {/* 찜해찜 버튼 및 카운트 */}
            <div style={{ cursor: 'pointer' }}>
              <Link to="/myfavorite">
                <Button sx={{ border: 'none', textTransform: 'none' }}>찜해찜</Button>
                <div>{favoriteCount}</div>
              </Link>
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