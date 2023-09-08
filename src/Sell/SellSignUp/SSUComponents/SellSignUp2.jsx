import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import SSUHeader from './SSUHeader';
import SellUpAPI from './SiginUpAPI';

const SellSignUp2 = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tel, settel] = useState('');
  const [activeStep, setActiveStep] = useState(1);
  const [privacy, setPrivacy] = useState(false);
  const [open, setOpen] = useState(false);
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpen = () => setOpen(true);
  const handleClose = (accepted) => {
    setPrivacy(accepted);
    setOpen(false);
  };

  const validateUsername = (value) => {
    if (value.match(/\S+@\S+\.\S+/)) {
      setUsernameError('이메일 형식이 맞습니다.');
    } else {
      setUsernameError('이메일 형식이 올바르지 않습니다.');
    }
  };

  const validatePassword = (value) => {
    if (value.length < 8) {
      setPasswordError('비밀번호는 8자 이상이어야 합니다.');
    } else {
      setPasswordError('8자 이상의 비밀번호입니다.');
    }
  };

  const validateConfirmPassword = (value) => {
    if (value !== password) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError('비밀번호가 일치합니다.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      usernameError !== '이메일 형식이 맞습니다.' ||
      passwordError !== '8자 이상의 비밀번호입니다.' ||
      confirmPasswordError !== '비밀번호가 일치합니다.' ||
      !privacy
    ) {
      alert('입력을 확인해주세요.');
      console.log(usernameError);
      console.log(passwordError);
      console.log(confirmPasswordError);
      console.log(privacy);
      return;
    }
    const result = await SellUpAPI(username, password, tel, privacy); // 여기에 필요한 정보를 추가
    console.log('앞단', result);
    if (result === '회원가입 성공!') {
      console.log('이름', username);
      alert('회원가입 되었습니다.');
      navigate('/sellsign3', { state: { username } });
    } else {
      alert(result); // 에러 메시지 출력
    }
  };

  return (
    <>
      <Container
        style={{ padding: '10%', border: '1px solid #ccc', height: '100vh' }}
      >
        <SSUHeader activeStep={activeStep}></SSUHeader>
        <div style={{ textAlign: 'center', margin: '5% auto' }}>
          <Typography variant="h5">회원가입</Typography>
        </div>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} container alignItems="center">
              <Typography variant="body1">아이디</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="아이디"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  validateUsername(e.target.value);
                }}
              />
              {usernameError && (
                <div
                  className="error-message"
                  style={{
                    textAlign: 'center',
                    color:
                      usernameError === '이메일 형식이 맞습니다.'
                        ? 'blue'
                        : 'red',
                    fontSize: '90%',
                  }}
                >
                  {usernameError}
                </div>
              )}
            </Grid>
            <Grid item xs={12} container alignItems="center">
              <Typography variant="body1">비밀번호</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="비밀번호"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
              />
              {passwordError && (
                <div
                  className="error-message"
                  style={{
                    color:
                      passwordError === '8자 이상의 비밀번호입니다.'
                        ? 'blue'
                        : 'red',
                    fontSize: '90%',
                  }}
                >
                  {passwordError}
                </div>
              )}
            </Grid>
            <Grid item xs={12} container alignItems="center">
              <Typography variant="body1">비밀번호 확인</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="비밀번호 확인"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  validateConfirmPassword(e.target.value);
                }}
              />
              {confirmPasswordError && (
                <div
                  className="error-message"
                  style={{
                    color:
                      confirmPasswordError === '비밀번호가 일치합니다.'
                        ? 'blue'
                        : 'red',
                    fontSize: '90%',
                  }}
                >
                  {confirmPasswordError}
                </div>
              )}
            </Grid>
            <Grid item xs={12} container alignItems="center">
              <Typography variant="body1">전화번호</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="전화번호"
                value={tel}
                onChange={(e) => {
                  settel(e.target.value);
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{ textAlign: 'right', marginTop: '0' }}
              onClick={handleOpen}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={privacy}
                    sx={{ '& svg': { fontSize: '1.3rem' } }}
                  />
                }
                label={
                  <Typography variant="body2" style={{ fontSize: '90%' }}>
                    개인정보 동의서
                  </Typography>
                }
                value={privacy}
              />
            </Grid>

            <Grid item xs={12} style={{ textAlign: 'center', marginTop: '0' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleRegister}
                sx={{
                  color: 'white',
                  width: '95%',
                  fontSize: '110%',
                }}
              >
                다음
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>

      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogTitle
          id="alert-dialog-title"
          checked={privacy}
          onChange={(e) => setPrivacy(e.target.checked)}
        >
          {'개인정보 동의서'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            「개인정보보호법 제15조(개인정보의 수집․이용), 제17조(개인정보의
            제공), 제18조(개인정보의 이용․제공 제한, 제22조(동의를 받는
            방법)」에 의거 개인정보처리에 관하여 고지를 받았으며 본인은 위와
            같이 개인정보 수집 및 이용․제공에 동의합니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(true)} color="primary" autoFocus>
            동의
          </Button>
          <Button onClick={() => handleClose(false)} color="primary">
            거부
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SellSignUp2;
