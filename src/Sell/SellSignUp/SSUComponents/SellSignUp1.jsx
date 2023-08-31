import React, { useState } from 'react';
import SSUsaup from './SSUsaup';
import SSUHeader from './SSUHeader';
import SSUdoro from './SSUdoro';
import { useNavigate } from 'react-router-dom'; // useNavigate hook을 import합니다.
import { Button, Container, Typography } from '@mui/material';
import { Height } from '@mui/icons-material';

const SellSignUp1 = () => {
  const [businessNumber, setBusinessNumber] = useState('');
  const [roadNumber, setRoadNumber] = useState('');
  const navigate = useNavigate(); // useNavigate hook을 사용합니다.
  const [activeStep, setActiveStep] = useState(0);
  const [nextButtonEnabled, setNextButtonEnabled] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    navigate('/sellsign2', { state: { businessNumber, roadNumber } });
  };

  return (
    <>
      <Container style={{ padding: '12%', border: '1px solid #ccc', height: '100%' }}>
        <SSUHeader activeStep={activeStep}></SSUHeader>
        <Typography
          variant="h5"
          style={{ textAlign: 'center', margin: '15% auto', fontWeight: 'bold' }}
        >
          정보 조회
        </Typography>
        <SSUsaup setNextButtonEnabled={setNextButtonEnabled} />

        <div style={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!nextButtonEnabled}
            sx={{
              color: 'white'
              , width: '78%'
              , backgroundColor: '#21BF73'
            }}
          >
            다음
          </Button>
        </div>
      </Container>
    </>
  );
};

export default SellSignUp1;
