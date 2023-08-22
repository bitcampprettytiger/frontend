import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom'; // useNavigate hook을 import합니다.
import SSUHeader from './SSUHeader';

const SellSignUp2 = () => {
  const [businessNumber, setBusinessNumber] = useState('');
  const [roadNumber, setRoadNumber] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // useLocation hook을 사용합
  useEffect(() => {
    if (location.state) {
      setBusinessNumber(location.state.businessNumber);
      setRoadNumber(location.state.roadNumber);
    }
  }, [location.state]);

  const handleNext = () => {
    navigate('/sellsign3', { state: { businessNumber, roadNumber } });
  };
  return (
    <>
      <Container style={{ padding: '20px', border: '1px solid #ccc' }}>
        <SSUHeader></SSUHeader>
        <div style={{ textAlign: 'center', margin: '5% auto' }}>
          <Typography variant="h5">회원가입</Typography>
        </div>
        <form>
          <Grid container spacing={2}>
            {[
              '아이디',
              '비밀번호',
              '비밀번호 확인',
              '가게 주소',
              '전화번호',
              '사업자',
              '도로점유',
            ].map((label, index) => (
              <Grid item xs={12} container alignItems="center">
                <Typography variant="body1">{label}</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  type={index === 1 || index === 2 ? 'password' : 'text'}
                  value={
                    label === '도로점유'
                      ? roadNumber
                      : label === '사업자'
                      ? businessNumber
                      : ''
                  }
                  disabled={label === '도로점유' || label === '사업자'} // 여기에 disabled 속성을 추가
                  onChange={(e) => {
                    if (label === '도로점유') setRoadNumber(e.target.value);
                    if (label === '사업자') setBusinessNumber(e.target.value);
                  }}
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
