import React from 'react';
import { AppBar, Toolbar, Typography, Box, Grid, Avatar } from '@mui/material';

const Header = () => {
  return (
    <AppBar position='static' color="default">
      <Toolbar sx={{ backgroundColor: '#ffffff' }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={1}>
            <Avatar
              alt="왼쪽 화살표"
              src="../images/LeftArrow.png" // 이미지의 URL을 여기에 입력하세요.
              sx={{ width: '100%', height: 'auto' }}
            />
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h6" align="center" color="text.primary">
              가게정보
            </Typography>
          </Grid>
          <Grid item xs={1}></Grid> {/* 오른쪽 공간 확보 */}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
