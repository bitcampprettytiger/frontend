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
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [tel, settel] = useState('');
  const [accName, setAccName] = useState('');
  const [accNum, setAccNum] = useState('');
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
      setUsernameError('이메일 형식이 맞습니다');
    } else {
      setUsernameError('이메일 형식이 올바르지 않습니다.');
    }
  };

  const validatePassword = (value) => {
    if (value.length < 8) {
      setPasswordError('비밀번호는 8자 이상이어야 합니다.');
    } else {
      setPasswordError('비밀번호는 8자 이상입니다');
    }
  };

  const validateConfirmPassword = (value) => {
    if (value !== password) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError('비밀번호가 일치합니다');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      usernameError !== '이메일 형식이 맞습니다' ||
      passwordError !== '비밀번호는 8자 이상입니다' ||
      confirmPasswordError !== '비밀번호가 일치합니다' ||
      !privacy
    ) {
      alert('입력을 확인해주세요.');
      return;
    }
    const result = await SellUpAPI(username, password, tel, privacy); // 여기에 필요한 정보를 추가

    if (result === '회원가입 성공!') {
      console.log(privacy);
      alert('회원가입 되었습니다.');
      navigate('/'); // 로그인 페이지로 이동
    } else {
      alert(result); // 에러 메시지 출력
    }

  };


  return (
    <>
      <Container style={{ padding: '20px', border: '1px solid #ccc' }}>
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
                  setusername(e.target.value);
                  validateUsername(e.target.value);
                }}
              />
              {usernameError && (
                <div
                  className="error-message"
                  style={{
                    textAlign: 'center',
                    color:
                      usernameError === '이메일 형식이 맞습니다' ? 'blue' : '',
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
                <div className="error-message">{passwordError}</div>
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
                <div className="error-message">{confirmPasswordError}</div>
              )}
            </Grid>
            <Grid item xs={12} container alignItems="center">
              <Typography variant="body1">전화번호</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="전화번호"
                type="password"
                value={tel}
                onChange={(e) => {
                  settel(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} container alignItems="center">
              <Typography variant="body1">계좌명</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="계좌명"
                value={accName}
                onChange={(e) => setAccName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} container alignItems="center">
              <Typography variant="body1">계좌번호</Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="계좌번호"
                value={accNum}
                onChange={(e) => setAccNum(e.target.value)}
              />
            </Grid>
            <div onClick={handleOpen}>
              <FormControlLabel
                control={<Checkbox checked={privacy} />}
                label="개인정보 동의서"
                value={privacy}
              />
            </div>
            <Grid
              item
              xs={12}
              style={{ textAlign: 'center', marginTop: '20px' }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleRegister}
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
            여기에 개인정보 처리방침의 내용을 입력해주세요.
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
