import React from 'react';
import { Box, Grid, Button } from '@mui/material';
import '../../../Global.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const SSSMenuList = ({ menus, onDeleteMenu }) => {
  // 금액을 쉼표로 구분하고 "원"을 붙이는 함수
  const formatPrice = (price) => {
    return `${parseInt(price, 10).toLocaleString('ko-KR')}원`;
  };
  const theme = createTheme({
    typography: {
      fontFamily: 'NanumSquareRound, Arial, sans-serif',
    },
  });
  return (
    <ThemeProvider theme={theme}>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '400px',
        margin: 'auto',
        marginTop: '5%',
        border: '1px solid black',
        fontFamily:'NanumSquareRound, Arial, sans-serif'
      }}
    >
      <Grid container spacing={2} justifyContent="center" sx={{marginBottom:'5%'}}>
        <Grid item xs={4} sx={{ textAlign: 'center' }}>
          메뉴 목록
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center' }}>
          금액
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center' }}>
          삭제
        </Grid>
      </Grid>
      <Box
        sx={{
          maxHeight: '180px',
          overflowY: 'scroll',
          width: '100%',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          scrollbarWidth: 'none',
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {menus.map((menu, index) => (
            <React.Fragment key={index}>
              <Grid item xs={4} sx={{ textAlign: 'center' }}>
                {menu.name}
              </Grid>
              <Grid item xs={4} sx={{ textAlign: 'center' }}>
                {formatPrice(menu.price)} {/* 금액 형식 변경 */}
              </Grid>
              <Grid item xs={4} sx={{ textAlign: 'center' }}>
                <Button variant="outlined" color="secondary" onClick={() => onDeleteMenu(index)}>
                  삭제
                </Button>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Box>
    </Box>
    </ThemeProvider>
  );
};

export default SSSMenuList;
