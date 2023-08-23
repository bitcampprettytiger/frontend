import React, { useState } from 'react';
import { Button, Container, Typography, Grid, TextField } from '@mui/material';
import SellHeader from '../SellLayout/SellHeader.jsx';
import SellFooter from '../SellLayout/SellFooter.jsx';

const SellMySet = () => {
  // 데이터베이스에서 받아온 정보를 상태로 관리
  const [info, setInfo] = useState({
    구분: '111',
    대표메뉴: '111',
    가게이름: '111',
    가게주소: '111',
    전화번호: '111',
  });

  // 정보 수정 이벤트 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  // 수정완료 클릭 이벤트 핸들러
  const handleUpdateClick = () => {
    // 여기에 DB 저장 로직 추가
  };

  return (
    <>
      <SellHeader />
      <Container style={{ padding: '20px', border: '1px solid #ccc', maxWidth: '500px', margin: '5% auto' }}>
        <Typography variant="h5" style={{ textAlign: 'center', margin: '5% auto' }}>
          가게정보
        </Typography>
        <Grid container spacing={2} sx={{ textAlign: 'center' }}>
          {Object.keys(info).map((key, index) => (
            <React.Fragment key={index}>
              <Grid item xs={6} sx={{ fontWeight: 'bold', color: '#555' }}>{key}</Grid>
              <Grid item xs={6}>
                <TextField
                  name={key}
                  value={info[key]}
                  onChange={handleInputChange}
                  fullWidth
                  disabled={key !== '가게이름' && key !== '전화번호'}
                />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button variant="contained" color="primary" sx={{ width: '45%', marginRight: '10%' }} onClick={handleUpdateClick}>
            수정완료
          </Button>
          <Button variant="contained" color="secondary" sx={{ width: '45%' }}>
            탈퇴
          </Button>
        </div>
      </Container>
      <SellFooter />
    </>
  );
};

export default SellMySet;
