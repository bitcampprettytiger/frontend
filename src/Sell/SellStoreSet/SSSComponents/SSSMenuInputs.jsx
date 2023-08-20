import React, { useState } from 'react';
import { Button, TextField, Box, Grid, Typography } from '@mui/material';
const SSSMenuInput = ({ onAddMenu }) => {
  const [menu, setMenu] = useState('');
  const [price, setPrice] = useState('');
  const isValid = menu.trim() !== '' && price.trim() !== '';

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]+$/.test(value)) {
      // 입력값이 비어 있거나 숫자로만 구성되어 있으면 값을 업데이트합니다.
      setPrice(value);
    }
  };

  const addMenu = () => {
    if (isValid) {
      // 유효성 검사 추가
      onAddMenu(menu, price);
      setMenu('');
      setPrice('');
    }
  };
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '400px',
        margin: 'auto',
        marginTop:'10%'
      }}
    >
      <Typography variant="h5" sx={{ marginTop: '5%' }}>
        메뉴 정보 입력
      </Typography>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ marginTop: '5%' }}
      >
        <Grid item xs={6} sx={{ textAlign: 'center' }}>
          메뉴명
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'center' }}>
          금액
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            value={menu}
            onChange={(e) => setMenu(e.target.value)}
            fullWidth
            sx={{ width: '80%', marginLeft: '10%' }} // 입력창 크기 조정
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            value={price}
            onChange={handlePriceChange}
            fullWidth
            sx={{ width: '80%', marginLeft: '10%' }} // 입력창 크기 조정
          />
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={addMenu}
            disabled={!isValid} // 유효하지 않으면 버튼 비활성화
          >
            추가
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SSSMenuInput;