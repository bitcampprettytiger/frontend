import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Grid, Typography } from '@mui/material';

const SSSMenuInputs = ({ onAddMenu }) => {
  const [menuName, setMenuName] = useState('');
  const [menuContent, setMenuContent] = useState('');
  const [price, setPrice] = useState('');
  const [menuList, setMenuList] = useState([]);

  const addMenu = () => {
    if (menuName && menuContent && price) {
      onAddMenu(menuName, menuContent, price);
      setMenuName('');
      setMenuContent('');
      setPrice('');
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ maxWidth: '400px', margin: 'auto' }}
    >
      <Grid variant="h5" sx={{ textAlign: 'center' }}>
        메뉴 정보 입력
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            label="메뉴명"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="메뉴 내용"
            value={menuContent}
            onChange={(e) => setMenuContent(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="금액"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Button variant="contained" color="primary" onClick={addMenu}>
            메뉴 추가
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SSSMenuInputs;
