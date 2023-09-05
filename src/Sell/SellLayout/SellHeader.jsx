import React from 'react';
import { AppBar, Toolbar, Typography, Box, Grid, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position='sticky' sx={{
      width: '100%',
      height: '10vh',
      backgroundColor: 'white',
      top: 0,
      boxShadow: 0,
      borderBottom: '1px solid #e7e7e7',
      verticalAlign: 'middle',
    }}>
      <Toolbar sx={{ display: 'flex', height: '10vh', }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={1}>
            <IconButton edge="start" aria-label="back" onClick={() => { navigate(-1) }}>
              <ArrowBackIcon sx={{ width: '100%', height: '100%' }} />
            </IconButton>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h6" align="left" color="text.primary" sx={{marginLeft: '5%', fontSize: '110%'}}>
              사장님 페이지
            </Typography>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;