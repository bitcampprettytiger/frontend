import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

const ReservationButtons = ({ title }) => {
  const [isAllowed, setIsAllowed] = useState(null);

  const handleAllow = () => {
    setIsAllowed(true);
  };

  const handleDeny = () => {
    setIsAllowed(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '400px',
        margin: 'auto',
        marginTop: '5%',
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Button
          variant="contained"
          onClick={handleAllow}
          sx={{
            backgroundColor: isAllowed === true ? 'limegreen' : 'grey',
            width: '100px', // 버튼 크기 설정
          }}
        >
          허용
        </Button>
        <Button
          variant="contained"
          onClick={handleDeny}
          sx={{
            backgroundColor: isAllowed === false ? 'red' : 'grey',
            width: '100px', // 버튼 크기 설정
          }}
        >
          거부
        </Button>
      </Box>
    </Box>
  );
};

const ReservationSection = () => {
  return (
    <>
      <ReservationButtons title="줄서기 예약" />
      <ReservationButtons title="포장 예약" />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '5%',
        }}
      >
        <Button variant="contained" color="primary">
          수정완료
        </Button>
      </Box>
    </>
  );
};

export default ReservationSection;
