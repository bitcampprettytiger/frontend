import React, { useState, useEffect } from 'react';
import './Mypage.css';
import Footer from '../../Layout/Footer';
import Header from '../../Layout/Header';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link, useNavigate } from 'react-router-dom';
import { useFavorite } from '../../Menu/MyPage/MyPageComponents/FavoriteContext';
import axios from 'axios';

function Mypage() {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("닉네임");
  const [newNickname, setNewNickname] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { setFavoriteShops, favoriteShops } = useFavorite();
  const navigate = useNavigate();

  const getHeaders = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      navigate("/");
      return;
    }
    return {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${accessToken}`,
    };
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setNewNickname(nickname);
  };

  const handleSaveClick = () => {
    setNickname(newNickname);
    setIsEditing(false);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 2000);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setNewNickname(e.target.value);
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const headers = getHeaders();

        // 사용자 정보 가져오기
        const userInfoResponse = await axios.get('http://27.96.135.75/myPage/myInfo', { headers });
        const userData = userInfoResponse.data;

        setNickname(userData.nickname || "닉네임");

        // 즐겨찾기 정보 가져오기
        const favoriteVendorsResponse = await axios.get('http://27.96.135.75/myPage/myFavoriteVendors', { headers });
        const favoriteVendorsData = favoriteVendorsResponse.data;

        setFavoriteShops(favoriteVendorsData.favoriteShops || []);

      } catch (error) {
        console.error('Could not fetch data:', error);
      }
    };

    fetchAllData();
  }, []);

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
