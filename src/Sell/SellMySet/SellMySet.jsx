
import React from 'react';
import { Button, Box, Typography, Grid } from '@mui/material';

const SellMySet = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        maxWidth: '400px',
        padding: 2,
        borderRadius: '10px',
        backgroundColor: '#f5f5f5',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.1)',
        margin:'5% auto'
      }}
    >
      <Typography variant="h5" align="center" sx={{ marginBottom: '5%', color: '#333' }}>
        가게정보
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ fontWeight: 'bold', color: '#555' }}>구분</Grid>
        <Grid item xs={6} sx={{ color: '#555' }}>111</Grid>
        <Grid item xs={6} sx={{ fontWeight: 'bold', color: '#555' }}>대표메뉴</Grid>
        <Grid item xs={6} sx={{ color: '#555' }}>111</Grid>
        <Grid item xs={6} sx={{ fontWeight: 'bold', color: '#555' }}>가게이름</Grid>
        <Grid item xs={6} sx={{ color: '#555' }}>111</Grid>
        <Grid item xs={6} sx={{ fontWeight: 'bold', color: '#555' }}>전화번호</Grid>
        <Grid item xs={6} sx={{ color: '#555' }}>111</Grid>
        <Grid item xs={6} sx={{ fontWeight: 'bold', color: '#555' }}>도로점유</Grid>
        <Grid item xs={6} sx={{ color: '#555' }}>111</Grid>
        <Grid item xs={6} sx={{ fontWeight: 'bold', color: '#555' }}>사업자</Grid>
        <Grid item xs={6} sx={{ color: '#555' }}>111</Grid>
      </Grid>

      <Grid container justifyContent="space-between" sx={{ marginTop: '5%' }}>
        <Button variant="contained" color="primary" sx={{ width: '45%' }}>
          수정완료
        </Button>
        <Button variant="contained" color="secondary" sx={{ width: '45%' }}>
          탈퇴
        </Button>
      </Grid>
    </Box>
  );
};

export default SellMySet;