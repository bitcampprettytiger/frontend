import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Typography, Checkbox } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
const SSSMenuList = ({ menus, onDeleteMenu }) => {
  const navigate = useNavigate();

  console.log('메뉴받기', menus);
  console.log(
    '메뉴 - 메뉴 이미지 : ',
    menus.map((menu) => menu.menuImage)
  );
  useEffect(() => {
    let initialStock = {};
    menus.forEach((menu, index) => {
      initialStock[index] = false; // 초기 품절 상태는 false
    });
    setOutOfStock(initialStock);
  }, [menus]);

  const handleStockChange = (e, index) => {
    setOutOfStock({
      ...outOfStock,
      [index]: e.target.checked,
    });
  };
  const [outOfStock, setOutOfStock] = useState({});
  const handleDelete = (index) => {
    onDeleteMenu(index);
  };
  const formatPrice = (price) =>
    `${parseInt(price, 10).toLocaleString('ko-KR')}원`;

  const theme = createTheme({
    typography: {
      fontFamily: 'NanumSquareRound, Arial, sans-serif',
    },
  });
  const accessToken = localStorage.getItem('accessToken');

  const sendMenuInfo = async () => {
    try {
      for (const [index, menu] of menus.entries()) {
        const formData = new FormData();
        formData.append('menuName', menu.menuName);
        formData.append('price', parseInt(menu.price, 10));
        formData.append('menuContent', menu.menuContent);
        formData.append('menuType', menu.menuType);
        formData.append(
          'menuSellStatus',
          outOfStock[index] ? 'OUT_OF_STOCK' : 'SELL'
        );

        if (menu.menuImage) {
          formData.append('file', menu.menuImage);
        }

        const response = await axios.post(
          'https://mukjachi.site:6443/menu/info/insertMenu',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          console.log('메뉴정보', response);
        } else {
          alert('서버코드실패');
        }
      }
      alert('메뉴가 입력되었습니다.');
      navigate(-1);
    } catch (error) {
      alert('실패');
      console.error('There was an error sending the data', error);
    }
  };
  useEffect(() => {
    console.log('메뉴야111111111111111', menus);
  });
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          margin: 'auto',
          marginTop: '5%',
          border: '1px solid #BDBDBD',
          borderRadius: '5px',
          padding: '2%',
          background: 'white',
        }}
      >
        <Grid
          container
          spacing={1}
          justifyContent="center"
          sx={{ marginBottom: '5%' }}
        >
          <Grid item xs={3} sx={{ textAlign: 'center' }}>
            사진
          </Grid>
          <Grid item xs={2} sx={{ textAlign: 'center' }}>
            종류
          </Grid>
          <Grid item xs={2} sx={{ textAlign: 'center' }}>
            이름
          </Grid>
          <Grid item xs={3} sx={{ textAlign: 'center' }}>
            내용
          </Grid>
          <Grid item xs={2} sx={{ textAlign: 'center' }}>
            금액
          </Grid>
        </Grid>
        <Box
          sx={{
            maxHeight: '180px',
            minHeight: '180px',
            overflowY: 'scroll',
            width: '100%',
          }}
        >
          <Grid container spacing={3} justifyContent="center">
            {menus.map((menu, index) => (
              <React.Fragment key={index}>
                <Grid item xs={3} sx={{ textAlign: 'center' }}>
                  {menu.menuImage ? (
                    <img
                      src={URL.createObjectURL(menu.menuImage)}
                      alt="menu preview"
                      style={{ width: '50px', height: '50px' }}
                    />
                  ) : (
                    'N/A'
                  )}
                </Grid>
                <Grid item xs={2} sx={{ textAlign: 'center' }}>
                  {menu.menuType}
                </Grid>
                <Grid item xs={2} sx={{ textAlign: 'center' }}>
                  {menu.menuName}
                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'center' }}>
                  {menu.menuContent}
                </Grid>
                <Grid item xs={2} sx={{ textAlign: 'center' }}>
                  {formatPrice(menu.price)}
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Box>
      </Box>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          onClick={sendMenuInfo}
          sx={{
            background: '#21BF73',
            marginTop: '5%',
          }}
        >
          완료
        </Button>
      </Grid>
    </ThemeProvider>
  );
};

export default SSSMenuList;
