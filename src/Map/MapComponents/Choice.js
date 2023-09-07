import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { ImSpoonKnife } from 'react-icons/im';
import { BiStoreAlt } from 'react-icons/bi';

const Choice = ({ moveToCurrentPosition, toggleSIGmenu, selectedSIGmenus }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSTFood = location.pathname === '/stfood';
  const isTRFood = location.pathname === '/trfood';

  const bgColor = isSTFood ? '#FD5E53' : isTRFood ? '#FF5403' : '#FD5E53';
  const borderColor = isSTFood ? '#FD5E53' : isTRFood ? '#FF5403' : '#FD5E53';

  const IconComponent = isSTFood ? ImSpoonKnife : isTRFood ? BiStoreAlt : ImSpoonKnife;
  const textDisplay = isSTFood ? '길거리' : isTRFood ? '포차' : '길거리';


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
          height: '8%',
        }}
      >
        <Box
          onClick={moveToCurrentPosition}
          sx={{
            pointerEvents: 'auto',
            margin: '0 auto',
            bgcolor: bgColor, 
            width: '20%',
            ml: '25px',
            borderRadius: '20px',
            height: '90%'
          }}
        >
          <Box sx={{
            width: '100%',
            height: '100%',
            backgroundColor: bgColor,
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <IconComponent style={{ marginRight: '3%', fontSize: '120%' }} /> 
            {textDisplay}
          </Box>
        </Box>
        <Box
          onClick={() => navigate('/search')}
          sx={{
            width: '65%',
            border: '1px solid',
            borderColor : borderColor,
            textAlign: 'center',
            margin: '0 auto',
            pointerEvents: 'auto',
            backgroundColor: 'white',
            borderRadius: '30px',
            height: '90%',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <AiOutlineSearch style={{
            fontSize: '150%',
            color: borderColor,
            margin: '0 4%'
          }} />
          <span style={{ color: 'grey', fontSize: '90%' }}>검색하기</span>
        </Box>

      </Box>
      <Box
        sx={{
          display: 'flex',
          mt: '5%',
          gap: '8%',
          justifyContent: 'center',
        }}
      >
        {['분식', '국물', '볶음', '튀김'].map((type, index) => (
          <Button
            key={index}
            placeholder='장소 검색'
            sx={{
              pointerEvents: 'auto',
              color: borderColor,
              borderStyle: 'none',
              borderRadius: '20px',
              backgroundColor: 'white',
              width: '13%',
              height: '30%',
              fontSize: '100%',
              fontWeight: 700,
              boxShadow: '1px 1px 4px 1px grey',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              '&:hover': {
                backgroundColor: borderColor,
                color: 'white'
              },
              '&:active': {
                backgroundColor: borderColor,
                color: 'white'
              },
              '&:focus': {
                backgroundColor: borderColor,
                color: 'white'
              }
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
