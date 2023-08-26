import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import registerUser from './RegisterUser';
import Logo from '../login-component/Logo';
import './Register.css';
const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nickname, setNickname] = useState('');
  const [privacy, setPrivacy] = useState(false);
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [open, setOpen] = useState(false); // 모달창 열림/닫힘 상태
  const [tel, setTel] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (privacy) => {
    setPrivacy(privacy);
    alert(privacy);
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

  // 회원가입 핸들링
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

    // 전화번호와 닉네임은 유효성 검사가 필요할 경우 추가
    const result = await registerUser(
      username,
      password,
      tel,
      privacy,
      nickname
    ); // 여기에 필요한 정보를 추가

    if (result === '회원가입 성공!') {
      console.log(privacy);
      alert('회원가입 되었습니다.');
      navigate('/'); // 로그인 페이지로 이동
    } else {
      alert(result); // 에러 메시지 출력
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <Logo />
        <h2 style={{ textAlign: 'center' }}>회원가입</h2>
        <div>
          <TextField
            required
            type="text"
            placeholder="아이디"
            value={username}
            sx={{ width: '100%' }}
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
                color: usernameError === '이메일 형식이 맞습니다' ? 'blue' : '',
              }}
            >
              {usernameError}
            </div>
          )}
        </div>
        <div>
          <TextField
            required
            type="password"
            placeholder="비밀번호"
            sx={{ width: '100%' }}
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
                textAlign: 'center',
                color:
                  passwordError === '비밀번호는 8자 이상입니다' ? 'blue' : '',
              }}
            >
              {passwordError}
            </div>
          )}
        </div>
        <div>
          <TextField
            required
            sx={{ width: '100%' }}
            type="password"
            placeholder="비밀번호 확인"
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
                textAlign: 'center',
                color:
                  confirmPasswordError === '비밀번호가 일치합니다'
                    ? 'blue'
                    : '',
              }}
            >
              {confirmPasswordError}
            </div>
          )}
        </div>

        <TextField
          required
          type="text"
          placeholder="전화번호"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
        />
        <TextField
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <div onClick={handleOpen}>
          <FormControlLabel
            control={<Checkbox checked={privacy} />}
            label="개인정보 동의서"
            value={privacy}
          />
        </div>
        <div className="sub-fun">
          <button type="submit" className="sub-button">
            회원가입
          </button>
        </div>
      </form>
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
    </div>
  );
};

export default Register;
