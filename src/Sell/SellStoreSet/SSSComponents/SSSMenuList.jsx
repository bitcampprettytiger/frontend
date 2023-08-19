import React from 'react';
import { Box, Grid, Button } from '@mui/material';

const SSSMenuList = ({ menus, onDeleteMenu }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '400px',
        margin: 'auto',
        marginTop: '5%',
        border : '1px solid black'
      }}
    >
      <Grid container spacing={2} justifyContent="center">
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
          overflowY: 'scroll', // 스크롤 설정
          width: '100%',
          '&::-webkit-scrollbar': { // Chrome, Safari, newer versions of Opera
            display: 'none',
          },
          '-ms-overflow-style': 'none', // IE 10+
          scrollbarWidth: 'none', // Firefox
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {menus.map((menu, index) => (
            <React.Fragment key={index}>
              <Grid item xs={4} sx={{ textAlign: 'center' }}>
                {menu.name}
              </Grid>
              <Grid item xs={4} sx={{ textAlign: 'center' }}>
                {menu.price}
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
  );
};

export default SSSMenuList;
