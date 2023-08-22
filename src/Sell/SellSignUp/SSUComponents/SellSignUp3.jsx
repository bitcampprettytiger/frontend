import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // useNavigate hook을 import합니다.
import SSUHeader from './SSUHeader';

const SellSignUp3 = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const navigate = useNavigate(); // useNavigate hook을 사용합니다.

  const handleNext = () => {
    navigate('/selllogin'); // 다음 버튼을 클릭하면 /2로 이동합니다.
    // 스테퍼 값을 2로 변경하는 로직을 여기에 추가하면 됩니다.
  };
  return (
    <>
      <Container style={{ padding: '20px', border: '1px solid #ccc' }}>
      <SSUHeader></SSUHeader>

        <Typography
          variant="h5"
          style={{ textAlign: 'center', margin: '5% auto' }}
        >
          상세 정보 작성
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} container alignItems="center">
              <Typography variant="body1" sx={{ margin: '2% 0' }}>
                구분
              </Typography>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>옵션 선택</InputLabel>
                <Select label="옵션 선택">
                  <MenuItem value={'노점'}>노점</MenuItem>
                  <MenuItem value={'길거리'}>길거리</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} container alignItems="center">
              <Typography variant="body1" sx={{ margin: '2% 0' }}>
                대표메뉴
              </Typography>
              <TextField fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={12} container alignItems="center">
              <Typography variant="body1" sx={{ margin: '2% 0' }}>
                이름
              </Typography>
              <TextField fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={12} container alignItems="center">
              <Typography variant="body1" sx={{ margin: '2% 0' }}>
                전화번호
              </Typography>
              <TextField fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={12} container alignItems="center">
              <Typography variant="body1" sx={{ margin: '2% 0' }}>
                가게 사진
              </Typography>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginLeft: '3%', marginTop: '3%' }} // 간격을 둡니다.
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{ marginLeft: '15px', height: '100px' }}
                />
              )}
            </Grid>
            <Grid
              item
              xs={12}
              style={{ textAlign: 'center', marginTop: '20px' }}
            >
              <Button variant="contained" color="primary" onClick={handleNext}>
                완료
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default SellSignUp3;
