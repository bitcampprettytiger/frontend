import React, { useEffect, useState } from 'react';
import { Box, IconButton, AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

function SellFooter({vendorId}) {
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
        marginTop: '5%',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-around', alignItems: 'center' }}>
        <Link to={`/sellset/${vendorId}`}>
          <IconButton
            color={activeButton === 'streetFood' ? 'primary' : 'default'}
            onClick={() => handleButtonClick('streetFood')}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
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
                판매 설정
              </Box>
            </Box>
          </IconButton>
        </Link>

        <Link to={`/sellhome`}>
          <IconButton
            color={activeButton === 'home' ? 'primary' : 'default'}
            onClick={() => handleButtonClick('home')}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
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
            </Box>
          </IconButton>
        </Link>

        <Link to={`/sellmyset/${vendorId}`}>
          <IconButton
            color={activeButton === 'myPage' ? 'primary' : 'default'}
            onClick={() => handleButtonClick('myPage')}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
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
                판매 확인
              </Box>
            </Box>
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default SellFooter;