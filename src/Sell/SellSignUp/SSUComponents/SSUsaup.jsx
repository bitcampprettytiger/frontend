import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Container,
  Grid,
} from '@mui/material';

const SSUsaup = ({ setNextButtonEnabled }) => {
  const [region, setRegion] = useState('');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [responseMessage, setResponseMessage] = useState(''); // 응답 메시지 상태
  const [buttonColor, setButtonColor] = useState('#21BF73');
  const [fontColor, setFontColor] = useState('white');

  const handleSubmit = async () => {
    const payload = {
      region,
      value1,
      value2: value2 || null,
    };


    try {
      console.log(value1);
      console.log(value2);
      console.log(region);
      const response = await axios.post(
        'http://192.168.0.240/API/validateByRegion',
        payload
      );
      // 성공적으로 응답을 받은 경우 처리 로직
      console.log(response.data);
      // 응답에서 일치 여부 확인 (서버 응답 형식에 따라 수정 필요)
      setResponseMessage('정보가 일치합니다.');
      setNextButtonEnabled(true); // 정보 일치시 버튼 활성화
      setButtonColor('#f0f0f0');
      setFontColor('black');
    } catch (error) {
      setResponseMessage('정보가 일치하지 않습니다.');
      setNextButtonEnabled(false); // 정보 불일치시 버튼 활성화
      setButtonColor('#FF745A');
      setFontColor('white');
      // 에러 발생 시 처리 로직
      console.error(error);
    }
  };

  const renderFields = () => {
    switch (region) {
      case '경기도':
        return (
          <>
            <TextField
              label="정보1"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              fullWidth
            />
            <TextField
              label="정보2"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              fullWidth
              sx={{ marginTop: '10%' }}
            />
          </>
        );
      case '노량진':
        return (
          <TextField
            label="정보1"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            fullWidth
          />
        );
      case '동작구':
        return (
          <div>
            <TextField
              label="정보1"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              fullWidth
            />
            <TextField
              label="정보2"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              fullWidth
              sx={{ marginTop: '10%' }}
            />
          </div>
        );
      case '강서구':
        return (
          <div>
            <TextField
              label="value1"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              fullWidth
            />
            <TextField
              label="value2"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              fullWidth
              sx={{ marginTop: '10%' }}
            />
          </div>
        );
      case '강남구':
        return (
          <div>
            <TextField
              label="value1"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              fullWidth
            />
          </div>
        );
      case '도봉구':
        return (
          <div>
            <TextField
              label="value1"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              fullWidth
            />
            <TextField
              label="value2"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              fullWidth
              sx={{ marginTop: '10%' }}
            />
          </div>
        );
      case '동대문':
        return (
          <div>
            <TextField
              label="value1"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              fullWidth
            />
            <TextField
              label="value2"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              fullWidth
              sx={{ marginTop: '10%' }}
            />
          </div>
        );
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
              <MenuItem value="노량진">노량진</MenuItem>
              <MenuItem value="동작구">동작구</MenuItem>
              <MenuItem value="동대문">동대문</MenuItem>
              <MenuItem value="강남구">강남구</MenuItem>
              <MenuItem value="강서구">강서구</MenuItem>
              <MenuItem value="도봉구">도봉구</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} style={{ marginTop: '10%' }}>
          {renderFields()}
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          {/* 버튼 중앙 배치 */}
          <button onClick={handleSubmit} style={{
            width: '90%', marginTop: '5%', height: '5vh',
            backgroundColor: buttonColor, color: fontColor, borderStyle: 'none',
            borderRadius: '5px', fontSize: '110%'
          }}>전송</button>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            textAlign: 'center',
            color: responseMessage === '정보가 일치합니다.' ? 'blue' : 'red',
          }}
        >
          {' '}
          {/* 응답 메시지에 따른 색상 변경 */}
          <p>{responseMessage}</p>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SSUsaup;
