import React from 'react';
import SSUsaup from './SSUsaup';
import SSUHeader from './SSUHeader';
import SSUdoro from './SSUdoro';
import { useNavigate } from 'react-router-dom'; // useNavigate hook을 import합니다.
import { Button, Container, Typography } from '@mui/material';

const SellSignUp1 = () => {
  const navigate = useNavigate(); // useNavigate hook을 사용합니다.

  const handleNext = () => {
    navigate('/sellsign2'); // 다음 버튼을 클릭하면 /2로 이동합니다.
    // 스테퍼 값을 2로 변경하는 로직을 여기에 추가하면 됩니다.
  };

  return (
    <>
    <Container style={{ padding: '20px', border: '1px solid #ccc' }}>
    <SSUHeader></SSUHeader>

      <Typography
        variant="h5"
        style={{ textAlign: 'center', margin: '5% auto' }}
      >
        정보 작성
      </Typography>
      <SSUsaup />
      <SSUdoro />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleNext}>
          다음
        </Button>
      </div>
    </Container>
    </>
  );
};

export default SellSignUp1;
