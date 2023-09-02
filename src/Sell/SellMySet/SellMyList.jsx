import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Typography, Checkbox } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
const SellMyList = () => {
  const { vendorId } = useParams();
  const [menus, setMenus] = useState([]);
  const [outOfStock, setOutOfStock] = useState({});

  const handleStockChange = (e, index) => {
    setOutOfStock({
      ...outOfStock,
      [index]: e.target.checked,
    });
  };

  useEffect(() => {
    let initialStock = {};
    menus.forEach((menu, index) => {
      initialStock[index] = false; // 초기 품절 상태는 false
    });
    setOutOfStock(initialStock);
  }, [menus]);
  const formatPrice = (price) =>
    `${parseInt(price, 10).toLocaleString('ko-KR')}원`;

  const theme = createTheme({
    typography: {
      fontFamily: 'NanumSquareRound, Arial, sans-serif',
    },
  });
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.0.240/menu/info/${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log('리스폰스', response);

        if (response.status === 200 && response.data.itemlist) {
          const sortedData = [...response.data.itemlist].sort((a, b) => {
            if (a.menuType < b.menuType) return -1;
            if (a.menuType > b.menuType) return 1;
            return 0;
          });
          setMenus(sortedData); // 정렬된 데이터로 상태를 업데이트
          console.log('리스트', menus);
        }
      } catch (error) {
        console.error('Failed to fetch menu data', error);
      }
    };

    fetchData();
  }, []);

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
          border: '1px solid black',
          height: '72vh',
        }}
      >
        <Grid
          container
          spacing={1}
          justifyContent="center"
          sx={{ marginBottom: '5%' }}
        >
          <Grid item xs={2} sx={{ textAlign: 'center' }}>
            사진
          </Grid>
          <Grid item xs={2} sx={{ textAlign: 'center' }}>
            종류
          </Grid>
          <Grid item xs={2} sx={{ textAlign: 'center' }}>
            이름
          </Grid>
          <Grid item xs={2} sx={{ textAlign: 'center' }}>
            내용
          </Grid>
          <Grid item xs={2} sx={{ textAlign: 'center' }}>
            금액
          </Grid>
          <Grid item xs={1} sx={{ textAlign: 'center' }}>
            품절
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
                <Grid item xs={2} sx={{ textAlign: 'center' }}>
                  {menu.primaryimage ? (
                    <img
                      src={menu.menuImageList[0].url}
                      alt="가게사진"
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
                <Grid item xs={2} sx={{ textAlign: 'center' }}>
                  {menu.menuContent}
                </Grid>
                <Grid item xs={2} sx={{ textAlign: 'center' }}>
                  {formatPrice(menu.price)}
                </Grid>
                <Grid item xs={1} sx={{ textAlign: 'center' }}>
                  <Checkbox
                    checked={outOfStock[index] || false}
                    onChange={(e) => handleStockChange(e, index)}
                  />
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Box>
      </Box>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          sx={{ background: '#21BF73', marginTop: '5%' }}
        >
          수정하러 가기
        </Button>
      </Grid>
    </ThemeProvider>
  );
};

export default SellMyList;
