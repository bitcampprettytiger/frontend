import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Grid, Typography } from '@mui/material';

const SSSMenuInputs = ({ onAddMenu }) => {
  const [menuName, setMenuName] = useState('');
  const [menuType, setMenuType] = useState('');
  const [menuContent, setMenuContent] = useState('');
  const [price, setPrice] = useState('');
  const [menuImage, setMenuImage] = useState(null);
  const [menuList, setMenuList] = useState([]);

  const addMenu = () => {
    console.log("메뉴 입력 ", { menuType, menuName, menuContent, price, menuImage });

    if (menuType && menuName && menuContent && price) {
      const newMenu = { menuType, menuName, menuContent, price, menuImage };
      setMenuList([...menuList, newMenu]);
      onAddMenu(menuType, menuName, menuContent, price, menuImage);
      setMenuName('');
      setMenuContent('');
      setPrice('');
      setMenuImage(null);
      setMenuType('');
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ maxWidth: '400px', margin: 'auto' }}
    >
      <Grid variant="h5" sx={{ textAlign: 'center', marginBottom: '5%' }}>
        메뉴 정보 입력
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            label="메뉴종류"
            value={menuType}
            onChange={(e) => setMenuType(e.target.value)}
            sx={{background: 'white'}}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="메뉴 이름"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            sx={{background: 'white'}}
          />
        </Grid>
        <Grid item xs={4}>
          <div>
            {menuImage && (
              <img
                src={menuImage}
                alt="menu preview"
                style={{ width: '100%', height: '20%' }}
              />
            )}

            <input
              type="file"
              style={{ display: 'none' }} 
              id="fileInput" 
              onChange={(e) => {
                console.log("File selected: ", e.target.files[0]);
                setMenuImage(e.target.files[0]);
              }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={() => document.getElementById("fileInput").click()}
              sx={{color: 'white'}}
            >
              사진 넣기
            </Button>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginTop: '5%' }}>
        <Grid item xs={8}>
          <TextField
            label="메뉴내용"
            value={menuContent}
            onChange={(e) => setMenuContent(e.target.value)}
            sx={{background: 'white'}}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="금액"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            sx={{background: 'white'}}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center', marginTop: '5%' }}>
        <Button variant="contained" color="primary" onClick={addMenu}
          sx={{ color: 'white' }}>
          메뉴 추가
        </Button>
      </Grid>
    </Box>
  );
};

export default SSSMenuInputs;
