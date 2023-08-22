import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import SSUHeader from './SSUHeader';

const SellSignUp2 = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [roadNumber, setRoadNumber] = useState('');
  const [activeStep, setActiveStep] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setBusinessNumber(location.state.businessNumber);
      setRoadNumber(location.state.roadNumber);
    }
  }, [location.state]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    navigate('/sellsign3', { state: { businessNumber, roadNumber } });
  };

  return (
    <>
      <Container style={{ padding: '20px', border: '1px solid #ccc' }}>
        <SSUHeader activeStep={activeStep}></SSUHeader>
        <div style={{ textAlign: 'center', margin: '5% auto' }}>
          <Typography variant="h5">회원가입</Typography>
        </div>
        <form>
          <Grid container spacing={2}>
            {[
              { label: '아이디', value: userId, onChange: setUserId },
              { label: '비밀번호', value: password, onChange: setPassword },
              {
                label: '비밀번호 확인',
                value: confirmPassword,
                onChange: setConfirmPassword,
              },
              {
                label: '핸드폰번호',
                value: phoneNumber,
                onChange: setPhoneNumber,
              },
              { label: '사업자등록번호', value: businessNumber },
              { label: '도로점유허가번호', value: roadNumber },
            ].map((field, index) => (
              <Grid item xs={12} container alignItems="center">
                <Typography variant="body1">{field.label}</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder={field.label} // 플레이스 홀더를 제목과 동일하게 설정
                  type={index === 1 || index === 2 ? 'password' : 'text'}
                  value={field.value}
                  disabled={
                    field.label === '도로점유허가번호' ||
                    field.label === '사업자등록번호'
                  }
                  onChange={(e) => field.onChange?.(e.target.value)}
                />
              </Grid>
            ))}
            <Grid
              item
              xs={12}
              style={{ textAlign: 'center', marginTop: '20px' }}
            >
              <Button variant="contained" color="primary" onClick={handleNext}>
                다음
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default SellSignUp2;
