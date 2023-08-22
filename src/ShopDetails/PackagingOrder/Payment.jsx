import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  CssBaseline,
  Divider,
  Container,
  Box,
} from '@mui/material';
import { useNavigate,  useLocation } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

function PaymentPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const totalAmount = state?.totalAmount || 0;

  return (
    <>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <Typography
            sx={{ flex: 1, color: 'black', fontWeight: 'bold', fontSize: '18px' }}
            component="div"
          >
            가게 이름
          </Typography>
          <IconButton edge="end" aria-label="close" onClick={() => navigate('/shophome')}>
            <CloseIcon sx={{ color: 'black', width: '18px', height: '18px' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Divider sx={{ my: 0, height: '0.2px', bgcolor: '#E7E3E3' }} />
      <Container>
        <Box sx={{ my: 2 }}>
          <Typography
            variant="h6"
            sx={{ fontSize: '18px', color: 'black', fontWeight: 'normal' }}
            gutterBottom
            component="div"
          >
            사장님 이름
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: '18px', color: 'black', textAlign: 'center' }}
            gutterBottom
            component="div"
          >
            계좌
          </Typography>
          <Divider sx={{ my: 0, height: '0.2px', bgcolor: '#E7E3E3' }} />
          <Typography
                variant="h6"
                sx={{ mt: 2, fontSize: '18px', color: 'black' }}
                component="div"
            >
        총 금액: {totalAmount} 원
      </Typography>
        </Box>
      </Container>
    </>
  );
}

export default PaymentPage;