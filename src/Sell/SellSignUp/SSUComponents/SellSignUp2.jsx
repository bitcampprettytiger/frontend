import React from 'react';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // useNavigate hook을 import합니다.
import SSUHeader from './SSUHeader';

const SellSignUp2 = () => {
  const navigate = useNavigate(); // useNavigate hook을 사용합니다.

  const handleNext = () => {
    navigate('/sellsign3'); // 다음 버튼을 클릭하면 /2로 이동합니다.
    // 스테퍼 값을 2로 변경하는 로직을 여기에 추가하면 됩니다.
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
              '도로점유',
              '사업자',
            ].map((label, index) => (
              <Grid item xs={12} container alignItems="center">
                <Typography variant="body1">{label}</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  type={index === 1 || index === 2 ? 'password' : 'text'}
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
