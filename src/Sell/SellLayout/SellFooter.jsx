import React, { useState } from 'react';
import { Box, Button, IconButton, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

function SellFooter() {
  const [activeButton, setActiveButton] = useState('');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <AppBar
      position="static"
      sx={{
        top: 'auto',
        bottom: 0,
        background: '#ffffff',
        borderTop: '1px solid #e7e7e7',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-around', alignItems: 'center' }}>
        <Link to={'/sellset'}>
          <IconButton
            color={activeButton === 'streetFood' ? 'primary' : 'default'}
            onClick={() => handleButtonClick('streetFood')}
          >
            <img
              src={
                activeButton === 'streetFood'
                  ? '/images/spoonfork.png'
                  : '/images/graySpoon.png'
              }
              alt="길거리음식아이콘"
              width="25px"
              height="25px"
            />
            <Box
              sx={{
                fontSize: '16px',
                color: activeButton === 'streetFood' ? '#FF745A' : 'gray',
                fontWeight: activeButton === 'streetFood' ? 'bold' : 'normal',
              }}
            >
              가게 설정
            </Box>
          </IconButton>
        </Link>


        <Link to={'/sellhome'}>
        <IconButton
          color={activeButton === 'home' ? 'primary' : 'default'}
          onClick={() => handleButtonClick('home')}
        >
          <img
            src={
              activeButton === 'home'
                ? '/images/home.png'
                : '/images/grayHome.png'
            }
            alt="홈아이콘"
            width="25px"
            height="25px"
          />
          <Box
            sx={{
              fontSize: '16px',
              color: activeButton === 'home' ? '#FF745A' : 'gray',
              fontWeight: activeButton === 'home' ? 'bold' : 'normal',
            }}
          >
            홈
          </Box>
        </IconButton>
        </Link>


        <Link to={'/sellmyset'}>
        <IconButton
          color={activeButton === 'myPage' ? 'primary' : 'default'}
          onClick={() => handleButtonClick('myPage')}
        >
          <img
            src={
              activeButton === 'myPage'
                ? '/images/mypage.png'
                : '/images/grayMypage.png'
            }
            alt="마이페이지아이콘"
            width="25px"
            height="25px"
          />
          <Box
            sx={{
              fontSize: '16px',
              color: activeButton === 'myPage' ? '#FF745A' : 'gray',
              fontWeight: activeButton === 'myPage' ? 'bold' : 'normal',
            }}
          >
            마이페이지
          </Box>
        </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default SellFooter;