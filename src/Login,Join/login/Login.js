import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../login-component/InputField';
import SnsLogin from '../login-component/Snslogin';
import instance from './instance';
import FindPW from '../login-component/FindPW';
import styles from './Login.module.css';
import Footprint from '../login-component/Footprint';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [footprints, setFootprints] = useState([]);
  const [x, setX] = useState(50);
  const [y, setY] = useState(50);
  const [rotation, setRotation] = useState(0); 
  const [flip, setFlip] = useState(false);

  // 모달 열고 닫기
  const handleModalOpen = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };
  const handleModalClose = () => setOpenModal(false);

  const navigate = useNavigate(); // 리다이렉트를 위한 navigate 함수 선언

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    

    try {
      const response = await instance.post(
        'https://mukjachi.site:6443/member/login',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const { accessToken, refreshToken, memberId } = response.data.item;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('memberId', memberId);

      if (accessToken) {
        console.log('로그인 성공! 토큰이 존재합니다.');
        navigate('/home');
      } else {
        console.log('로그인 실패! 토큰이 존재하지 않습니다.');
      }
    } catch (err) {
      console.log(err.response);
      setError('로그인에 실패하였습니다. 아이디와 비밀번호를 확인해주세요.');
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const angle = Math.random() * (Math.PI / 4) + rotation;
      const step = 50;
      const dx = Math.cos(angle) * step;
      const dy = Math.sin(angle) * step;

      const newX = x + dx;
      const newY = y + dy;

      const newFootprint = {
        x: `${newX}px`,
        y: `${newY}px`,
        rotation: (angle * 90) / Math.PI,
        flip: flip,
        id: Date.now(),
        opacity: 1, 
      };

      const opacities = [1, 0.6, 0.2];

      setFootprints((prevFootprints) => {
        let updatedFootprints = [...prevFootprints, newFootprint];

        if (updatedFootprints.length > 3) {
          updatedFootprints.shift();
        }

        updatedFootprints = updatedFootprints.map((footprint, index) => ({
          ...footprint,
          opacity: opacities[updatedFootprints.length - index - 1]
        }));

        return updatedFootprints;
      });

      setX(newX);
      setY(newY);
      setRotation(angle);
      setFlip(!flip);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [x, y, rotation, flip]);

  return (
    <div className={styles['login-container']}>
      {footprints.map((footprint) => (
        <Footprint key={footprint.id} {...footprint} />
      ))}
      <form className={styles['userlogin-form']}>
        <div className={styles['header']}>
          <div className={styles['logo-name']}>먹자취</div>
        </div>
        <div className={styles['userinput-field']}>
          <InputField
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <InputField
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <button onClick={handleSubmit} className={styles['login-btn']}>
          먹자취 로그인
        </button>
        <div className={styles['sub-fun']}>
          <Link to="/signup">
            <button className={styles['sub-button']}>회원가입</button>
          </Link>
          <button className={styles['sub-button']} onClick={handleModalOpen}>
            비밀번호 찾기
          </button>
        </div>
        <FindPW openModal={openModal} handleModalClose={handleModalClose} />
        <br />
        <SnsLogin />
      </form>
    </div>
  );
};

export default Login;