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
import { useLocation, useNavigate } from 'react-router-dom';
import SSUHeader from './SSUHeader';
import SSUAddressModal from './SSUAddressModal';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import VendorAPI from './VendorAPI';
import { Scrollbar } from 'smooth-scrollbar-react';
import { Scrollbar as BaseScrollbar } from "smooth-scrollbar/scrollbar";
const SellSignUp3 = () => {
  const location = useLocation();
  const username = location.state.username;
  console.log("이름", username)
  const [file, setFile] = useState(null);
  const [address, setAddress] = useState('');
  const [showPostcode, setShowPostcode] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [activeStep, setActiveStep] = useState(2);
  const [vendorType, setVendorType] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [SIGMenu, setSIGMenu] = useState('');
  const [tel, setTel] = useState('');
  const [businessDay, setBusinessDay] = useState({
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
  const handleVendorTypeChange = (event) => {
    setVendorType(event.target.value);
  };

  const handleVendorNameChange = (event) => {
    setVendorName(event.target.value);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const navigate = useNavigate();

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

  const handleBusinessDayChange = (event) => {
    setBusinessDay({
      ...businessDay,
      [event.target.name]: event.target.checked,
    });
  };

  const handleBusinessHoursChange = (event) => {
    setBusinessHours({
      ...businessHours,
      [event.target.name]: event.target.value,
    });
  };
  const handleNext = async () => {
    console.log('핸들시작');
    const result = await VendorAPI(
      vendorType,
      vendorName,
      SIGMenu,
      address,
      tel,
      businessDay,
      businessHours.시작,
      businessHours.마감,
      file,
      username
    );
    // 여기에 API 호출 후 원하는 작업을 수행 (예: 페이지 이동)
    if (result === '회원가입 성공!') {
      navigate('/selllogin');
    } else {
      alert('오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <>

      <SSUAddressModal
        open={showPostcode}
        onClose={() => setShowPostcode(false)}
        onComplete={handleAddress}
      />
      <Container style={{ padding: '10%', border: '1px solid #ccc' }}>
        <SSUHeader activeStep={activeStep} />
        <Typography
          variant="h5"
          style={{ textAlign: 'center', margin: '10% auto', fontWeight: 'bold' }}
        >
          상세 정보 작성
        </Typography>
        <form>
          <Typography variant="body1" sx={{ margin: '5% 2% 2% 0' }}>
            구분
          </Typography>
          {/* 옵션 선택 부분 */}
          <FormControl variant="outlined" fullWidth>
            <Select
              value={vendorType} // 상태에 대한 바인딩
              onChange={handleVendorTypeChange} // 이벤트 핸들러 바인딩
            >
              <MenuItem value={'노점'}>노점</MenuItem>
              <MenuItem value={'포장마차'}>포장마차</MenuItem>
            </Select>
          </FormControl>
          {/* 메뉴 선택 부분 */}
          <Grid item xs={12} container alignItems="center">
            <Typography variant="body1" sx={{ margin: '5% 2% 2% 0' }}>
              대표 메뉴 선택
            </Typography>
            <FormControl variant="outlined" fullWidth>
              <Select
                value={SIGMenu} // 상태에 대한 바인딩
                onChange={(e) => setSIGMenu(e.target.value)} // 이벤트 핸들러 바인딩
              >
                <MenuItem value={'분식'}>분식</MenuItem>
                <MenuItem value={'국물'}>국물</MenuItem>
                <MenuItem value={'볶음'}>볶음</MenuItem>
                <MenuItem value={'튀김'}>튀김</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* 가게 이름 필드 */}
          <Typography variant="body1" sx={{ margin: '5% 2% 2% 0' }}>
            가게 이름
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="가게 이름"
            value={vendorName} // 상태에 대한 바인딩
            onChange={handleVendorNameChange} // 이벤트 핸들러 바인딩
          />
          <Grid item xs={12} container alignItems="center">
            <Typography variant="body1" sx={{ margin: '5% 2% 2% 0' }}>가게 번호</Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="가게 번호"
              value={tel}
              onChange={(e) => {
                setTel(e.target.value);
              }}
            />
          </Grid>
          {/* 가게 주소 필드 */}
          <Grid item xs={12} container alignItems="center">
            <Typography variant="body1" sx={{ margin: '5% 2% 2% 0' }}>
              가게 주소
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="가게 주소"
              value={address}
              readOnly
            />
            <Grid item xs={12} container justifyContent="flex-end">
              <Button
                variant="contained"
                onClick={() => setShowPostcode(true)}
                sx={{ margin: '5% 0 10%', color: 'white' }}
              >
                주소 찾기
              </Button>
            </Grid>
          </Grid>

          {/* 가게 이미지 업로드 부분 */}
          <Grid container spacing={1}>
            <Grid item xs={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}> {/* 이 부분을 수정했습니다 */}
              <Typography variant="body1" sx={{ marginBottom: '10%', textAlign: 'center' }}>가게 이미지</Typography> {/* textAlign: 'center' 추가 */}
              <input
                type="file"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="file"
              />
              <label htmlFor="file" style={{ alignSelf: 'center' }}> {/* alignSelf: 'center' 추가 */}
                <Button variant="contained" color="primary" component="span" sx={{ color: 'white' }}>
                  파일 선택
                  <AttachFileIcon sx={{ fontSize: '130%' }} />
                </Button>
              </label>
            </Grid>
            <Grid item xs={6} style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100px',
                  border: '1px solid #ccc',
                  marginLeft: '16px',
                  textAlign: 'center',
                }}
              >
                <img
                  src={previewImage}
                  alt="미리보기"
                  style={{ width: '100%', maxHeight: '100%' }}
                />
              </div>
            </Grid>
          </Grid>
          {/* 영업일 체크박스 */}
          <Grid item xs={12} container alignItems="center">
            <Typography variant="body1" sx={{ margin: '10% 0 3%' }}>
              영업일
            </Typography>
            <FormGroup row>
              {Object.keys(businessDay).map((day) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={businessDay[day]}
                      onChange={handleBusinessDayChange}
                      name={day}
                    />
                  }
                  label={day}
                />
              ))}
            </FormGroup>
          </Grid>
          {/* 영업 시작 시간 선택 */}
          <Grid container spacing={2} alignItems="center" sx={{ marginTop: '5%' }}>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ marginBottom: '4%' }}>영업 시작</Typography>
              <FormControl variant="outlined" fullWidth>
                <Select
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
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ marginBottom: '4%' }}>영업 마감</Typography>
              <FormControl variant="outlined" fullWidth>
                <Select
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
          {/* 완료 버튼 */}
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            sx={{ margin: '10% 0' }}
          >
            <Button variant="contained"
              color="primary"
              onClick={handleNext}
              sx={{
                color: 'white'
                , width: '100%'
              }}>
              완료
            </Button>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default SellSignUp3;
