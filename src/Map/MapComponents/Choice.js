import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Choice = ({ moveToCurrentPosition, toggleSIGmenu, selectedSIGmenus }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        pointerEvents: 'auto',
        margin: '0 auto',
        width: '100%',
        height: '80%',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          margin: '0 auto',
          marginTop: '10%',
          height:'10%',
        }}
      >
        <Box
          onClick={moveToCurrentPosition}
          sx={{
            pointerEvents: 'auto',
            margin: '0 auto',
            bgcolor: 'red',
            width: '15%',
            ml: '25px',
            borderRadius: '20px',
          }}
        >
          <img
            src="images/stfood.png"
            alt="menu"
            style={{ width: '100%', height: '100%' }}
          />
        </Box>
        {/* search로 이동 */}
        <Box
          onClick={() => navigate('/search')}
          sx={{
            width: '60%',
            borderColor: 'black',
            border:'1px solid black',
            // borderRadius: '20px',
            textAlign: 'center',
            margin: '0 auto',
            pointerEvents: 'auto',
            backgroundColor: 'white',
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          mt: '5%',
          gap: '30px',
          justifyContent: 'center',
        }}
      >
        {['분식', '국물', '볶음', '튀김'].map((type, index) => (
          <Button
            key={index}
            sx={{
              pointerEvents: 'auto',
              color: '#C47BFD',
              borderColor: 'gray',
              borderRadius: '10px',
              backgroundColor: 'white',
              width: '20%',
              height: '30%',
              fontSize: '27px',
              fontWeight: 700,
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: selectedSIGmenus.includes(type) ? '2px' : '1px',
              borderStyle: 'solid',
              borderColor: selectedSIGmenus.includes(type) ? 'red' : 'gray',
              '&:hover': {
                backgroundColor: 'green', // 마우스를 올렸을 때 배경색을 파란색으로
              },
            }}
            onClick={() => toggleSIGmenu(type)}
          >
            {type}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default Choice;
