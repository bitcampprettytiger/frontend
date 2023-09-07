import { Box, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SnsLogin = () => {
  const navigate = useNavigate(); // useNavigate 사용
  const REST_API_KEY = '88c6a288697fac101a89f4f639c56f15';
  const REDIRECT_URI = 'http://localhost:3000/auth';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  return (
    <Box sx={{ margin: '5%' }}>
      <Typography sx={{ fontSize: '90%' }}>SNS 로그인</Typography>
      <Box
        sx={{
          height: '1px',
          backgroundColor: 'grey.300',
          margin: '10%',
        }}
      />
      <Grid container spacing={2}>
        <Grid item xs>
          <Box />
          <img
            src="/images/kakaologin.png"
            alt="카카오 로그인"
            style={{ width: '100%', height: '100%' }}
            onClick={loginHandler}
          />
        </Grid>
        <Grid item xs>
          <img
            src="/images/googlelogin.png"
            alt="구글 로그인"
            style={{
              width: '100%',
              height: '100%',
            }}
          ></img>
        </Grid>
        <Grid item xs>
          <img
            src="/images/applelogin.png"
            alt=" 로그인"
            style={{
              width: '100%',
              height: '100%',
            }}
          ></img>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SnsLogin;
