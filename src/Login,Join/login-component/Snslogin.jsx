import { Box, Typography, Grid } from '@mui/material';

const SnsLogin = () => (
  <Box sx={{margin: '5%'}}>
    <Typography 
      sx={{ fontSize: '90%' }}>
      SNS 로그인
    </Typography>
    <Box
      sx={{
        height: '1px',
        backgroundColor: 'grey.300',
        margin: '10%'
      }}
    />
    <Grid container spacing={2}>
      <Grid item xs>
        <Box
        />
        <img src='/images/kakaologin.png' alt='카카오 로그인'
          style={{
            width: '100%',
            height: '100%',
          }}></img>
      </Grid>
      <Grid item xs>
        <img src='/images/googlelogin.png' alt='구글 로그인'
          style={{
            width: '100%',
            height: '100%',
          }}></img>
      </Grid>
      <Grid item xs>
        <img src='/images/naverlogin.png' alt=' 로그인'
          style={{
            width: '100%',
            height: '100%',
          }}></img>
      </Grid>
    </Grid>
  </Box>
);

export default SnsLogin;
