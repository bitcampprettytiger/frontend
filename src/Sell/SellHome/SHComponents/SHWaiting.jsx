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
        padding: '5%',
        borderRadius: '10px',
        backgroundColor: '#f5f5f5',
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.1)',
        marginBottom: '3%',
      }}
    >
      <Grid
        container
        spacing={1}
        className="줄서기"
        style={{ marginBottom: '2%' }}
      >
        <Grid
          item
          xs={4}
          style={{
            fontWeight: 'bold',
            color: 'black',
            fontSize: '100%',
            marginBottom: '2%',
          }}
        >
          대기 순번
        </Grid>
        <Grid
          item
          xs={8}
          style={{ color: 'black', fontSize: '100%', marginBottom: '2%' }}
        >
          1번
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            fontWeight: 'bold',
            color: 'black',
            fontSize: '100%',
            marginBottom: '2%',
          }}
        >
          전화 번호
        </Grid>
        <Grid
          item
          xs={8}
          style={{
            textAlign: 'left',
            color: 'black',
            fontSize: '100%',
            marginBottom: '2%',
          }}
        >
          111-111-1111
        </Grid>
        <Grid
          item
          xs={4}
          style={{ fontWeight: 'bold', color: 'black', fontSize: '100%' }}
        >
          대기 인원
        </Grid>
        <Grid
          item
          xs={8}
          style={{ textAlign: 'left', color: 'black', fontSize: '100%' }}
        >
          5명
        </Grid>
      </Grid>
    </Box>
  );
};
export default SHWaiting;
