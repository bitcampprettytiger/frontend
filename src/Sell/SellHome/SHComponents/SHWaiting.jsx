import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

const SHWaiting = ({ onClick }) => {
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
        줄서기 목록
      </Typography>
      <Grid container spacing={1} className="줄서기">
        <Grid item xs={4} sx={{ fontWeight: 'bold', color: '#555' }}>
          대기번호
        </Grid>
        <Grid item xs={8} sx={{ fontWeight: 'bold', color: '#555' }}>
          1번
        </Grid>
        <Grid item xs={4} sx={{ color: '#555' }}>
          PN
        </Grid>
        <Grid item xs={6} sx={{ textAlign: 'left', color: '#555' }}>
          111-111-1111
        </Grid>
        <Grid item xs={2} sx={{ textAlign: 'right', color: '#555' }}>
          5명
        </Grid>
      </Grid>
    </Box>
  );
};

export default SHWaiting;