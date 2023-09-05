import React, { useState } from 'react';
import './SellLogin.css';
import Logo from './login-component/Logo';
import InputField from './login-component/InputField';
import instance from './instance';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SellLogin.css';
import FindPW from '../SellJoin/FindPW';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate(); // useNavigate hook을 사용합니다.
  // 모달 열고 닫기
  const handleModalOpen = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };
  const handleModalClose = () => setOpenModal(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await instance.post(
        'http://192.168.0.240:1004/member/login',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const { accessToken, refreshToken } = response.data.item;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      if (accessToken) {
        console.log('로그인 성공! 토큰이 존재합니다.');
        navigate('/sellhome');
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
        <div className="header">
          <Logo />
          <h2 className="title-text">사장님</h2>
        </div>
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
        <br />
        <button onClick={handleSubmit} className="login-btn">
          로그인
        </button>
        <div className="sub-fun">
          <Link to={'/sellsign1'}>
            <button className="sub-button">회원가입</button>
          </Link>
          <button className="sub-button" onClick={handleModalOpen}>
            비밀번호 찾기
          </button>
        </div>
        <FindPW openModal={openModal} handleModalClose={handleModalClose} />
      </form>
    </div>
  );
};

export default Login;
