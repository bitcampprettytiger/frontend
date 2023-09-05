import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { ImSpoonKnife } from 'react-icons/im';
import { ImHome } from 'react-icons/im';
import { BsPersonCircle } from 'react-icons/bs';

function SellFooter({ vendorId }) {
  const [activeButton, setActiveButton] = useState('');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const iconColor = (button) => (activeButton === button ? '#21BF73' : '#B6B4B4');

  return (
    <AppBar
      position="relative"
      sx={{
        width: '100%',
        height: '10vh',
        backgroundColor: 'white',
        bottom: 0,
        boxShadow: 0,
        borderTop: '1px solid #e7e7e7',
        justifyContent: 'center'
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <Link to={`/sellset/${vendorId}`}>
          <IconButton onClick={() => handleButtonClick('streetFood')}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ImSpoonKnife style={{ color: iconColor('streetFood'), fontSize: '25px' }} />
              <Box sx={{ fontSize: '60%', marginTop: '10%', color: iconColor('streetFood'), fontWeight: activeButton === 'streetFood' ? 'bold' : 'normal' }}>판매 설정</Box>
            </Box>
          </IconButton>
        </Link>

        <Link to={`/sellhome`}>
          <IconButton onClick={() => handleButtonClick('home')}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ImHome style={{ color: iconColor('home'), fontSize: '25px' }} />
              <Box sx={{ fontSize: '60%', marginTop: '10%', color: iconColor('home'), fontWeight: activeButton === 'home' ? 'bold' : 'normal' }}>홈</Box>
            </Box>
          </IconButton>
        </Link>

        <Link to={`/sellmyset/${vendorId}`}>
          <IconButton onClick={() => handleButtonClick('myPage')}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <BsPersonCircle style={{ color: iconColor('myPage'), fontSize: '25px' }} />
              <Box sx={{ fontSize: '60%', marginTop: '10%', color: iconColor('myPage'), fontWeight: activeButton === 'myPage' ? 'bold' : 'normal' }}>판매 확인</Box>
            </Box>
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default SellFooter;
