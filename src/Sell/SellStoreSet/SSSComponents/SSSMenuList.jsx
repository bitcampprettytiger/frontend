import axios from 'axios';
import React from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const SSSMenuList = ({ menus, onDeleteMenu }) => {
  const formatPrice = (price) =>
    `${parseInt(price, 10).toLocaleString('ko-KR')}원`;

  const theme = createTheme({
    typography: {
      fontFamily: 'NanumSquareRound, Arial, sans-serif',
    },
  });

  const sendMenuInfo = async () => {
    try {
      const formData = new FormData();
      
      menus.forEach((menu, index) => {
        formData.append(`menus[${index}].menuName`, menu.menuName);
        formData.append(`menus[${index}].price`, parseInt(menu.price, 10));
        formData.append(`menus[${index}].menuContent`, menu.menuContent);
      });
  
      const response = await axios.post('http://27.96.135.75/menu/info', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        alert('메뉴 정보 전송 성공');
      } else {
        alert('서버코드실패');
      }
    } catch (error) {
      alert('실패');
      console.error('There was an error sending the data', error);
    }
  };
  

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
          fontFamily: 'NanumSquareRound, Arial, sans-serif',
        }}
      >
        <Grid
          container
          spacing={1}
          justifyContent="center"
          sx={{ marginBottom: '5%' }}
        >
          <Grid item xs={3} sx={{ textAlign: 'center' }}>
            메뉴명
          </Grid>
          <Grid item xs={3} sx={{ textAlign: 'center' }}>
            메뉴 내용
          </Grid>
          <Grid item xs={3} sx={{ textAlign: 'center' }}>
            금액
          </Grid>
          <Grid item xs={3} sx={{ textAlign: 'center' }}>
            삭제
          </Grid>
        </Grid>
        <Box
          sx={{
            maxHeight: '180px', // 이 부분을 고정값으로 설정
            minHeight: '180px', // 최소 높이도 동일하게 설정
            overflowY: 'scroll',
            width: '100%',
          }}
        >
          <Grid container spacing={3} justifyContent="center">
            {menus.map((menu, index) => (
              <React.Fragment key={index}>
                <Grid item xs={3} sx={{ textAlign: 'center' }}>
                  {menu.menuName}
                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'center' }}>
                  {menu.menuContent}
                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'center' }}>
                  {formatPrice(menu.price)}
                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'center' }}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => onDeleteMenu(index)}
                  >
                    삭제
                  </Button>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Box>
      </Box>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Button variant="contained" color="secondary" onClick={sendMenuInfo}>
          완료
        </Button>
      </Grid>
    </ThemeProvider>
  );
};

export default SSSMenuList;
