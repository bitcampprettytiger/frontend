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
            display: 'flex',        // Flexbox 사용
            justifyContent: 'center', // 수평 가운데 정렬
            alignItems: 'center',     // 수직 가운데 정렬
          }}>
            <ImSpoonKnife style={{marginRight: '3%'}} />
            길거리
          </Box>
        </Box>
        {/* search로 이동 */}
        <Box
          onClick={() => navigate('/search')}
          sx={{
            width: '65%',
            border: '1px solid #FD5E53',
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
            color: '#FD5E53',
            margin: '0 4%'
          }} />
          <span style={{color : 'grey', fontSize: '90%'}}>검색하기</span>
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
              width: '13%',
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
