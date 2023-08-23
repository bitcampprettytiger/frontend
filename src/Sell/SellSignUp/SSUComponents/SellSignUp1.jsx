import React, { useState } from 'react';
import SSUsaup from './SSUsaup';
import SSUHeader from './SSUHeader';
import SSUdoro from './SSUdoro';
import { useNavigate } from 'react-router-dom'; // useNavigate hook을 import합니다.
import { Button, Container, Typography } from '@mui/material';

const SellSignUp1 = () => {
  const [businessNumber, setBusinessNumber] = useState('');
  const [roadNumber, setRoadNumber] = useState('');
  const navigate = useNavigate(); // useNavigate hook을 사용합니다.
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    navigate('/sellsign2', { state: { businessNumber, roadNumber } });
  };

  return (
    <>
      <Container style={{ padding: '20px', border: '1px solid #ccc' }}>
        <SSUHeader activeStep={activeStep}></SSUHeader>
        <Typography
          variant="h5"
          style={{ textAlign: 'center', margin: '5% auto' }}
        >
          정보 작성
        </Typography>
        <SSUsaup
          businessNumber={businessNumber}
          setBusinessNumber={setBusinessNumber}
        />

        <SSUdoro roadNumber={roadNumber} setRoadNumber={setRoadNumber} />
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
