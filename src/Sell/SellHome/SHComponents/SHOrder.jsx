import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  Typography
} from '@mui/material';

const OrderDetail = ({ menu, quantity ,onClick}) => {
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(menu);
    if (openDialog) {
      const timer = setTimeout(() => {
        setOpenDialog(false);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [openDialog]);

  useEffect(() => {
      console.log(menu);
  }, [menu]);

  // 주문 반려 버튼 클릭 이벤트 핸들러
  const handleOrderBack = () => {
    setOpenDialog(true);
  };

  const handleOrderDetail = () => {
    // 주문상세내역 버튼 클릭 시 로직을 여기에 작성
  };

  return (
    <Box
      onClick={(e) => {
        if (!e.target.closest('button')) {
          onClick();
        }
      }} // 버튼 제외하고 클릭 시 onClick 호출
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '400px',
        margin: 'auto',
        padding: '5%',
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
        메뉴이름
      </Grid>
      <Grid item xs={6} sx={{ color: '#555' }}>
        {menu?.menuName}
      </Grid>
      <Grid item xs={6} sx={{ fontWeight: 'bold', color: '#555' }}>
        메뉴 소개
      </Grid>
      <Grid item xs={12} sx={{ color: '#555' }}>
        {menu?.menuContent}
      </Grid>
      <Grid item xs={6} sx={{ fontWeight: 'bold', color: '#555' }}>
        메뉴 타입
      </Grid>
      <Grid item xs={12} sx={{ color: '#555' }}>
        {menu?.menuType}
      </Grid>
      <Grid item xs={6} sx={{ fontWeight: 'bold', color: '#555' }}>
        메뉴 타입
      </Grid>
      <Grid item xs={12} sx={{ color: '#555' }}>
        {menu?.price}
      </Grid>
      <Grid item xs={6} sx={{ fontWeight: 'bold', color: '#555' }}>
        주문 수량
      </Grid>
      <Grid item xs={12} sx={{ color: '#555' }}>
        {quantity}
      </Grid>

</Grid>
      <Grid container spacing={1} sx={{ marginTop: '2%' }}>
        <Grid item xs={6}>
          <Button variant="contained" onClick={handleOrderBack}>
            주문반려
          </Button>
          <Button variant="contained" onClick={handleOrderDetail} style={{ color: 'white', marginLeft: '3%' }}>
            주문상세내역
          </Button>
        </Grid>
      </Grid>
      <Dialog open={openDialog}>
        <DialogTitle>반려되었습니다.</DialogTitle>
      </Dialog>
    </Box>
  );
};

export default OrderDetail;