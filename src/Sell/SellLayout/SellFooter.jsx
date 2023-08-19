import React, { useState } from 'react';
import { Box, IconButton, AppBar, Toolbar } from '@mui/material';

function SellFooter() {
  const [activeButton, setActiveButton] = useState('');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, background: '#ffffff', borderTop: '1px solid #e7e7e7' }}>
      <Toolbar sx={{ justifyContent: 'space-around', alignItems: 'center' }}>
        {[
          { name: 'streetFood', image: 'spoonfork.png', grayImage: 'graySpoon.png', label: '가게 설정' },
          { name: 'home', image: 'home.png', grayImage: 'grayHome.png', label: '홈' },
          { name: 'myPage', image: 'mypage.png', grayImage: 'grayMypage.png', label: '마이페이지' },
        ].map((button) => (
          <IconButton
            key={button.name}
            color={activeButton === button.name ? 'primary' : 'default'}
            onClick={() => handleButtonClick(button.name)}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img
                src={activeButton === button.name ? `/images/${button.image}` : `/images/${button.grayImage}`}
                alt={`${button.label}아이콘`}
                width="25px"
                height="25px"
              />
              <Box
                sx={{
                  fontSize: '16px',
                  color: activeButton === button.name ? '#FF745A' : 'gray',
                  fontWeight: activeButton === button.name ? 'bold' : 'normal',
                }}
              >
                {button.label}
              </Box>
            </Box>
          </IconButton>
        ))}
      </Toolbar>
    </AppBar>
  );
}

export default SellFooter;
