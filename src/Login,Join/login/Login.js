import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import Logo from '../login-component/Logo';
import InputField from '../login-component/InputField';
import SnsLogin from '../login-component/Snslogin';
import instance from './instance';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); // 리다이렉트를 위한 navigate 함수 선언

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await instance.post(
        'http://27.96.135.75/member/login',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const { accessToken, refreshToken } = response.data.item; //memberId
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      // localStorage.setItem('memberId', memberId);


      if (accessToken) {
        console.log('로그인 성공! 토큰이 존재합니다.');
        navigate('/home'); // 로그인 성공 시 '/hello'로 리다이렉트
      } else {
        console.log('로그인 실패! 토큰이 존재하지 않습니다.');
      }
    } catch (err) {
      console.log(err.response);
      setError('로그인에 실패하였습니다. 아이디와 비밀번호를 확인해주세요.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <Logo />
        <h2>로그인</h2>
        <div className="input-field">
          <InputField
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-field">
          <InputField
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="sub-fun">
          <Link to="/signup">
            <button className="sub-button">회원가입</button>
          </Link>
          <button className="sub-button">비밀번호 찾기</button>
        </div>
        <br />
        <button onClick={handleSubmit} className="login-btn">
          로그인
        </button>
        <SnsLogin />
      </form>
    </div>
  );
};

export default Login;
