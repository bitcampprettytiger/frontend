import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './Mypage.css';
import Footer from '../../Layout/Footer';
import Header from '../../Layout/Header';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Link } from 'react-router-dom';
import { useFavorite } from '../../Menu/MyPage/MyPageComponents/FavoriteContext';
import { LuFootprints } from 'react-icons/lu';
import { FaHeart } from 'react-icons/fa';
import { MdOutlineShoppingBasket } from 'react-icons/md';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
        const userInfoResponse = await axios.get('https://mukjachi.site:7443/myPage/myInfo', { headers });
        const userData = userInfoResponse.data;

        setNickname(userData.nickname || "닉네임");

        // 즐겨찾기 정보 가져오기
        const favoriteVendorsResponse = await axios.get('https://mukjachi.site:7443/myPage/myFavoriteVendors', { headers });
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
                <ArrowForwardIosRoundedIcon />
              </button>
            </div>
          )}

          {showModal && <div className="modal">닉네임이 변경 되었습니다.</div>}

          <div className="button-group">
            <Link to="/myreview">
              <div className="custom-button">
                <LuFootprints className="button-icon icon-left" />
                <span class="button-text">나의 먹자취 리뷰</span>
                <KeyboardArrowRightIcon className='icon-right' />
              </div>
            </Link>

            <Link to="/myfavorite">
              <div className="custom-button">
                <FaHeart className="button-icon themeColor icon-left" />
                <span class="button-text">내가 찜해찜!</span>
                <KeyboardArrowRightIcon className='icon-right' />
              </div>
            </Link>

            <Link to="/mytakeout">
              <div className="custom-button">
                <MdOutlineShoppingBasket className="button-icon icon-left" />
                <span class="button-text">포장주문내역</span>
                <KeyboardArrowRightIcon className='icon-right' />
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
