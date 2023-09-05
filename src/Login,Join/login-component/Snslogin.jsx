import { Box, Typography, Grid } from '@mui/material';

const SnsLogin = () => (
  <Box>
    <Typography variant="h6" gutterBottom>
      SNS 로그인
    </Typography>
    <Box
      sx={{
        height: '1px',
        backgroundColor: 'grey.300',
      }}
    />
    <Grid container spacing={2}>
      <Grid item xs>
        <Box
          sx={{
            width: '100%',
            height: '100px',
            backgroundColor: 'blue',
          }}
        />
      </Grid>
      <Grid item xs>
        <Box
          sx={{
            width: '100%',
            height: '100px',
            backgroundColor: 'pink',
          }}
        />
      </Grid>
      <Grid item xs>
        <Box
          sx={{
            width: '100%',
            height: '100px',
            backgroundColor: 'error.main',
          }}
        />
      </Grid>
    </Grid>
  </Box>
);

export default SnsLogin;
