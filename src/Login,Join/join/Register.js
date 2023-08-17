import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import registerUser from './RegisterUser'; // 회원가입 로직을 처리하는 함수
import Logo from '../login-component/Logo';
import InputField from '../login-component/InputField';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const validateUsername = (value) => {
    if (value === '') {
      setUsernameError(null);
    } else if (!value.match(/\S+@\S+\.\S+/)) {
      setUsernameError('이메일 형식이 올바르지 않습니다.');
    } else {
      setUsernameError('통과');
    }
  };

  const validatePassword = (value) => {
    if (value === '') {
      setPasswordError(null);
    } else if (value.length < 8) {
      setPasswordError('비밀번호는 8자 이상이어야 합니다.');
    } else {
      setPasswordError('통과');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const error = await registerUser(username, password);
    if (error) {
      alert(error); // 에러 메시지 출력
    } else {
      navigate('/'); // 로그인 페이지로 이동
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <Logo />
        <h2>회원가입</h2>
        <div className="inputdiv">
          <InputField
            type="text"
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
              style={{ color: usernameError === '통과' ? 'green' : 'red' }}
            >
              {usernameError}
            </div>
          )}
        </div>
        <InputField
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validatePassword(e.target.value);
          }}
        />
        {passwordError && (
          <div
            className="error-message"
            style={{ color: passwordError === '통과' ? 'green' : 'red' }}
          >
            {passwordError}
          </div>
        )}

        <div className="sub-fun">
          <button type="submit" className="sub-button">
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
