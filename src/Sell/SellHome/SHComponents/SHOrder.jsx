import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Typography
} from '@mui/material';

const OrderDetail = ({order, onClick }) => {
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
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
    if (order) {
      console.log(order);
    }
  }, [order]);

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
        주문번호
      </Grid>
      <Grid item xs={6} sx={{ color: '#555' }}>
        {order[0] && order[0].menu && order[0].menu.id}
      </Grid>
      <Grid item xs={12} sx={{ color: '#555' }}>
        {order[0] && order[0].menu && order[0].menu.menuName}
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