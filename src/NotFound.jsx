import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom sx={{fontSize:'200%',width:'100%', height:'50vh'}}>
        잘못된 페이지입니다
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
        뒤로 가기
      </Button>
    </Container>
  );
}

export default NotFound;
