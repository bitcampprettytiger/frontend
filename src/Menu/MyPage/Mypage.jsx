import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
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
import { auto } from 'async';

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Mypage() {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState("닉네임");
  const [newNickname, setNewNickname] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);
  const { favoriteCount, setFavoriteCount, favoriteShops, setFavoriteShops } = useFavorite();
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const fetchFavorites = async () => {
    try {
      const response = await fetch('/myPage/myFavoriteVendors');
      const data = await response.json();
      setFavoriteShops(data.favoriteShops || []);
    } catch (error) {
      console.error('Could not fetch favorite shops:', error);
    }
  };

  const handleClickOpen = (type) => {
    setModalType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


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
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        console.log("!!!!!!!!")
        const [reviewResponse, favoriteVendorsResponse] = await Promise.all([
          fetch('/myPage/myReviews'),
          fetch('/myPage/myFavoriteVendors')
        ]);
        console.log(reviewResponse);
        // const response = fetchMyFavoriteVendors();

        // console.log(response);


        const reviewData = await reviewResponse.json();
        console.log(reviewData);
        const favoriteVendorsData = await favoriteVendorsResponse.json();

        setReviewCount(reviewData.count);
        setFavoriteShops(favoriteVendorsData.favoriteShops || []);
        setFavoriteCount(favoriteShops.length);
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

          <Box
            component="div"
            sx={{
              p: '8%',
              border: '1px dashed grey',
              width: '100%', // 박스의 너비 설정
              backgroundColor: 'white', // 박스의 배경색 설정
              display: 'flex',
              justifyContent: 'space-between' // 버튼들을 박스 양 끝으로 분리
            }}
          >
            {/* 리뷰 버튼 및 카운트 */}
            <div className='reviewBox'>
              <Link to="/myreview">
                <Button sx={{
                  border: 'none',
                  textTransform: 'none',
                  color: '#FD5E53',
                  fontSize: '105%'
                }}>리뷰</Button>
                <div className='cntNum'>{reviewCount}</div>
              </Link>
            </div>

            {/* 찜해찜 버튼 및 카운트 */}
            <div className='favoriteBox'>
              <Link to="/myfavorite">
                <Button sx={{
                  border: 'none',
                  textTransform: 'none',
                  color: '#FD5E53',
                  fontSize: '105%'
                }}>찜해찜</Button>
                <div className='cntNum'>{favoriteCount}</div>
              </Link>
            </div>
          </Box>
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
          <div className='mypage-bottom' style={{ position: 'relative', textAlign: 'center', marginTop: '40%' }}>
            <button onClick={() => handleClickOpen('Terms')} style={{ fontSize: '90%', color: '#666666', background: 'none', border: 'none' }}>
              이용약관
            </button>
            |
            <button onClick={() => handleClickOpen('Privacy')} style={{ fontSize: '90%', color: '#666666', background: 'none', border: 'none' }}>
              개인정보처리방침
            </button>
            |
            <button onClick={() => handleClickOpen('Logout')} style={{ fontSize: '90%', color: '#666666', background: 'none', border: 'none' }}>
              로그아웃
            </button>
          </div>

          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            color='secondary'
            sx={{
              width: '90%', height: 'auto',
              margin: 'auto'
            }}
          >
            <DialogTitle sx={{fontSize: '100%', color : 'black'}}>
              {modalType === 'Terms' && '이용약관'}
              {modalType === 'Privacy' && '개인정보처리방침'}
              {modalType === 'Logout' && '로그아웃'}
            </DialogTitle>

            <DialogContent >
              <DialogContentText id="alert-dialog-slide-description" sx={{fontSize: '80%'}}>
                {modalType === 'Terms' && '이용약관의 내용'}
                {modalType === 'Privacy' && '개인정보처리방침의 내용'}
                {modalType === 'Logout' && '로그아웃하시겠습니까?'}
              </DialogContentText>
            </DialogContent>

            <DialogActions>
              {modalType === 'Logout' ? (
                <>
                  <Button onClick={handleClose} sx={{color: '#FD5E53', fontSize: '90%'}}>아니오</Button>
                  <Button onClick={handleClose} sx={{color: '#FD5E53', fontSize: '90%'}}>네</Button>
                </>
              ) : (
                <>
                  <Button onClick={handleClose} sx={{color: 'black', fontSize: '90%'}}>확인</Button>
                </>
              )}
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <Footer type="mypage" />
    </>
  );
}

export default Mypage;