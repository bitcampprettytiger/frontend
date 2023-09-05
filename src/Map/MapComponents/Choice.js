import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { ImSpoonKnife } from 'react-icons/im';
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
          height: '8%',
        }}
      >
        <Box
          onClick={moveToCurrentPosition}
          sx={{
            pointerEvents: 'auto',
            margin: '0 auto',
            bgcolor: 'red',
            width: '20%',
            ml: '25px',
            borderRadius: '20px',
            height: '90%'
          }}
        >
          <Box sx={{
            width: '100%',
            height: '100%',
            backgroundColor: '#FD5E53',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '10px',
          }}>
            <ImSpoonKnife />
            길거리음식
          </Box>
        </Box>
        {/* search로 이동 */}
        <Box
          onClick={() => navigate('/search')}
          sx={{
            width: '65%',
            borderColor: 'black',
            border: 'none',
            boxShadow: '1px 1px 4px 1px grey',
            textAlign: 'center',
            margin: '0 auto',
            pointerEvents: 'auto',
            backgroundColor: 'white',
            borderRadius: '5px',
            height: '90%',
            textAlign: 'left',
            position: 'relative'
          }}
        >
          <AiOutlineSearch style={{
            fontSize: '150%',
            position: 'absolute',
            top: '25%',
            marginLeft: '4%',
            color: 'gray'
          }} />
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
              color: '#FD5E53',
              borderStyle: 'none',
              borderRadius: '20px',
              backgroundColor: 'white',
              width: '15%',
              height: '30%',
              fontSize: '100%',
              fontWeight: 700,
              boxShadow: '1px 1px 4px 1px grey',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              '&:hover': {
                backgroundColor: '#FD5E53',
                color: 'white'
              },
              '&:active': {
                backgroundColor: '#FD5E53',
                color: 'white'
              },
              '&:focus': {
                backgroundColor: '#FD5E53',
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
