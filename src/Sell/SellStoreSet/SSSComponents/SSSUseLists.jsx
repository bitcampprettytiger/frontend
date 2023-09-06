import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  Grid,
  Button,
} from '@mui/material';
import axios from 'axios'; // 서버에 데이터를 보내기 위해 axios 라이브러리를 사용합니다.

const SSSUseLists = () => {
  const [amenities, setAmenities] = useState({
    선풍기: false,
    에어컨: false,
    가게화장실: false,
    공영화장실: false,
  });

  useEffect(() => {
    // amenities가 변경될 때마다 체크박스 상태를 문자열로 변환
    const amenitiesString = Object.entries(amenities)
      .filter(([key, value]) => value)
      .map(([key]) => key)
      .join(',');

    console.log(`Selected amenities: ${amenitiesString}`);
    // 이 문자열을 서버에 전달할 수 있습니다.
  }, [amenities]);

  const handleChange = (event) => {
    setAmenities({ ...amenities, [event.target.name]: event.target.checked });
  };

  const handleSendToServer = async () => {
    // 문자열로 변환
    const amenitiesString = Object.entries(amenities)
      .filter(([key, value]) => value)
      .map(([key]) => key)
      .join(',');

    try {
      // 서버에 비동기로 전송
      const response = await axios.post('https://mukjachi.site:6443/vendor/info', {
        helpCheck: amenitiesString,
      });
      console.log('Data sent to server:', response.data);
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '400px',
        margin: 'auto',
        marginTop: '5%',
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: '5%' }}>
        편의시설
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={amenities.fan}
                onChange={handleChange}
                name="선풍기"
                color="primary"
              />
            }
            label="선풍기"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            sx={{ textAlign: 'center' }}
            control={
              <Checkbox
                checked={amenities.airConditioner}
                onChange={handleChange}
                name="에어컨"
                color="primary"
              />
            }
            label="에어컨"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={amenities.storeToilet}
                onChange={handleChange}
                name="가게화장실"
                color="primary"
              />
            }
            label="가게화장실"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={amenities.publicToilet}
                onChange={handleChange}
                name="공영화장실"
                color="primary"
              />
            }
            label="공영화장실"
          />
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" onClick={handleSendToServer}>
        서버에 전송
      </Button>
    </Box>
  );
};

export default SSSUseLists;
