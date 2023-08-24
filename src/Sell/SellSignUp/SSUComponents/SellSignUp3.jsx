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
  Checkbox,
  FormGroup,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SSUHeader from './SSUHeader';
import SSUAddressModal from './SSUAddressModal';
import AttachFileIcon from '@mui/icons-material/AttachFile';
const SellSignUp3 = () => {
  const [address, setAddress] = useState('');
  const [showPostcode, setShowPostcode] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [activeStep, setActiveStep] = useState(2);

  const [businessDays, setBusinessDays] = useState({
    월: false,
    화: false,
    수: false,
    목: false,
    금: false,
    토: false,
    일: false,
  });
  const [businessHours, setBusinessHours] = useState({
    시작: '',
    마감: '',
  });

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
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/selllogin');
  };
  const handleAddress = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setAddress(fullAddress);
    setShowPostcode(false);
  };

  const handleBusinessDaysChange = (event) => {
    setBusinessDays({
      ...businessDays,
      [event.target.name]: event.target.checked,
    });
  };

  const handleBusinessHoursChange = (event) => {
    setBusinessHours({
      ...businessHours,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <SSUAddressModal
        open={showPostcode}
        onClose={() => setShowPostcode(false)}
        onComplete={handleAddress}
      />
      <Container style={{ padding: '20px', border: '1px solid #ccc' }}>
        <SSUHeader activeStep={activeStep} />
        <Typography
          variant="h5"
          style={{ textAlign: 'center', margin: '5% auto' }}
        >
          상세 정보 작성
        </Typography>
        <form>
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
            <FormControl variant="outlined" fullWidth>
              <InputLabel>메뉴 선택</InputLabel>
              <Select label="메뉴 선택">
                <MenuItem value={'면'}>면</MenuItem>
                <MenuItem value={'국물'}>국물</MenuItem>
                <MenuItem value={'볶음'}>볶음</MenuItem>
                <MenuItem value={'마른안주'}>마른안주</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid container spacing={2}>
            {[
              { label: '가게 이름' },
              { label: '가게 주소', value: address },
              { label: '가게 번호' },
            ].map((field) => (
              <Grid item xs={12} container alignItems="center">
                <Typography variant="body1" sx={{ margin: '2% 0' }}>
                  {field.label}
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder={field.label}
                  value={field.value || ''}
                  readOnly={field.label === '가게 주소'}
                />
                {field.label === '가게 주소' && (
                  <Grid item xs={12} container justifyContent="flex-end">
                    <Button
                      variant="contained"
                      onClick={() => setShowPostcode(true)}
                      sx={{ marginTop: '5%' }}
                    >
                      주소 찾기
                    </Button>
                  </Grid>
                )}
                {field.label === '가게 번호' && (
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography variant="body1">가게 이미지</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={8}
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      <input
                        type="file"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        id="file-input"
                      />
                      <label htmlFor="file-input">
                        <Button
                          variant="contained"
                          color="primary"
                          component="span"
                          sx={{ marginBottom: '5% ' }}
                        >
                          파일 선택
                        </Button>
                      </label>
                    </Grid>
                    <Grid item xs={12} style={{ padding: '0' }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center', // 이미지를 가운데로 정렬
                          alignItems: 'center',
                          height: '200px', // 이미지 박스의 높이를 현재 높이의 절반으로 설정
                          border: '1px solid #ccc', // 이미지 박스에 테두리 추가
                          marginLeft: '16px',
                          textAlign: 'center',
                        }}
                      >
                        <img
                          src={previewImage}
                          alt="가게 사진 미리보기"
                          style={{ width: '50%', maxHeight: '100%' }} // 이미지의 너비를 100%, 최대 높이를 100%로 설정
                        />
                      </div>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            ))}
            <Grid item xs={12} container alignItems="center">
              <Typography variant="body1" sx={{ margin: '2% 0' }}>
                영업일
              </Typography>
              <FormGroup row>
                {Object.keys(businessDays).map((day) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={businessDays[day]}
                        onChange={handleBusinessDaysChange}
                        name={day}
                      />
                    }
                    label={day}
                  />
                ))}
              </FormGroup>
            </Grid>
            <Grid item xs={6} container alignItems="center">
              <Typography variant="body1" sx={{ margin: '2% 0' }}>
                영업 시작
              </Typography>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>시작 시간</InputLabel>
                <Select
                  label="시작 시간"
                  name="시작"
                  value={businessHours.시작}
                  onChange={handleBusinessHoursChange}
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <MenuItem value={i.toString().padStart(2, '0') + ':00'}>
                      {i.toString().padStart(2, '0') + ':00'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} container alignItems="center">
              <Typography variant="body1" sx={{ margin: '2% 0' }}>
                영업 마감
              </Typography>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>마감 시간</InputLabel>
                <Select
                  label="마감 시간"
                  name="마감"
                  value={businessHours.마감}
                  onChange={handleBusinessHoursChange}
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <MenuItem value={i.toString().padStart(2, '0') + ':00'}>
                      {i.toString().padStart(2, '0') + ':00'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            sx={{ margin: '5% 0' }}
          >
            <Button variant="contained" color="primary" onClick={handleNext}>
              완료
            </Button>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default SellSignUp3;