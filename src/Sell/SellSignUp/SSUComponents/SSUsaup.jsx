import React from 'react';
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Grid,
} from '@mui/material';

const SSUsaup = ({ businessNumber, setBusinessNumber }) => {
  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '5%',
      }}
    >
      <Box className="login-form">
        <div className="input-field">
          <Typography variant="body1">사업자 등록번호</Typography>
          <TextField
            fullWidth
            variant="outlined"
            style={{ backgroundColor: 'white' }}
            value={businessNumber} // 여기에 value 속성을 추가
            onChange={(e) => setBusinessNumber(e.target.value)} // 여기에 onChange 속성을 추가
          />
        </div>
        <div className="input-field">
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="body1">개업일</Typography>
              <TextField
                variant="outlined"
                fullWidth
                style={{ backgroundColor: 'white' }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">사업자 명</Typography>
              <TextField
                variant="outlined"
                fullWidth
                style={{ backgroundColor: 'white' }}
              />
            </Grid>
          </Grid>
        </div>
        <div className="sub-fun">
          <Button variant="contained" color="primary" style={{ margin: '5%' }}>
            조회
          </Button>
        </div>
      </Box>
    </Container>
  );
};

export default SSUsaup;
