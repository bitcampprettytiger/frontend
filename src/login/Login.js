import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';
import Logo from '../login-component/Logo';
import InputField from '../login-component/InputField';
import SnsLogin from '../login-component/Snslogin';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData 객체를 생성하고 필드를 추가합니다.
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      // Axios 요청에서 'Content-Type': 'multipart/form-data' 헤더를 사용합니다.
      const response = await axios.post(
        'http://101.101.210.23:80/member/login',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const { token } = response.data.item;

      // 엑세스 토큰을 로컬 스토리지에 저장합니다.
      localStorage.setItem('accessToken', token);
      console.log(token);
      if (token) {
        console.log('로그인 성공! 토큰이 존재합니다.');
        console.log('Access Token:', token);
      } else {
        console.log('로그인 실패! 토큰이 존재하지 않습니다.');
      }

      // 로그인 성공 후 원하는 페이지로 리다이렉트하거나 다른 동작을 수행하세요.
      alert('성공');
      console.log(response.data);
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
          <Link to="/signup" className="sub-button">
            회원가입
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
