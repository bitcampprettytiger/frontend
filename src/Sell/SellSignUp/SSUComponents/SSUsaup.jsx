import React, { useState } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Container,
  Grid,
} from '@mui/material';

const SSUsaup = ({ businessNumber, setBusinessNumber }) => {
  const [region, setRegion] = useState('');

  const renderFields = () => {
    switch (region) {
      case '경기도':
        return <TextField label="허가번호(PRMSN_NM)" fullWidth />;
      case '노량진(동작구)':
        return <TextField label="?호점인지만 확인하는 로직" fullWidth />;
      case '동작':
        return (
          <div>
            <TextField
              label="거리가게명"
              fullWidth
              style={{ marginBottom: '5%' }}
            />
            <TextField label="위치" fullWidth />
          </div>
        );
      case '동대문':
        return (
          <div>
            <TextField
              label="거리가게명"
              fullWidth
              style={{ marginBottom: '5%' }}
            />
            <TextField label="주소" fullWidth />
          </div>
        );
      case '강남구':
        return <TextField label="도로명 주소" fullWidth />;
      case '강서구':
        return (
          <div>
            <TextField label="위치" fullWidth style={{ marginBottom: '5%' }} />
            <TextField label="판매품목?" fullWidth />
          </div>
        );
      case '도봉구':
        return (
          <div>
            <TextField
              label="도로주소"
              fullWidth
              style={{ marginBottom: '5%' }}
            />
            <TextField label="지정번호" fullWidth />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" style={{ padding: '20px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>지역 선택</InputLabel>
            <Select
              label="지역 선택"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <MenuItem value="경기도">경기도</MenuItem>
              <MenuItem value="동작">동작</MenuItem>
              <MenuItem value="노량진(동작구)">노량진(동작구)</MenuItem>
              <MenuItem value="동대문">동대문</MenuItem>
              <MenuItem value="강남구">강남구</MenuItem>
              <MenuItem value="강서구">강서구</MenuItem>
              <MenuItem value="도봉구">도봉구</MenuItem>
              {/* 필요한 만큼 다른 지역 옵션 추가 */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} style={{ marginTop: '20px' }}>
          {renderFields()}
        </Grid>
        {/* 나머지 폼 요소들 */}
      </Grid>
    </Container>
  );
};

export default SSUsaup;
