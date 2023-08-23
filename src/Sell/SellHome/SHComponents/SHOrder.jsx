import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';

const OrderDetail = ({ onClick }) => {
  // 버튼 클릭 이벤트 핸들러
  const handleOrderBack = () => {
    // 주문반력 버튼 클릭 시 로직을 여기에 작성
  };

  const handleOrderDetail = () => {
    // 주문상세내역 버튼 클릭 시 로직을 여기에 작성
  };

  return (
    <Box
      onClick={onClick} // 여기에 onClick 추가
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '400px',
        margin: 'auto',
        padding: 2,
        borderRadius: '10px',
        backgroundColor: '#f5f5f5',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.1)',
        marginBottom: '10px',
      }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{ marginBottom: '2%', color: '#333' }}
      >
        포장주문하기
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={6} sx={{ fontWeight: 'bold', color: '#555' }}>
          주문번호
        </Grid>
        <Grid item xs={6} sx={{ color: '#555' }}>
          1번
        </Grid>
        <Grid item xs={12} sx={{ color: '#555' }}>
          떡볶이 3인분 순대1인분
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ marginTop: '2%' }}>
        <Grid item xs={6}>
          <Button variant="contained" onClick={handleOrderBack}>
            주문반려
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" onClick={handleOrderDetail}>
            주문상세내역
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderDetail;