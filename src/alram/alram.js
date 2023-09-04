import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const CustomerPage = () => {
  const [position, setPosition] = useState(0);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const socket = io('http://192.168.0.58:8081'); // 서버 주소
  useEffect(() => {
    socket.on('welcome', () => {
        
      
    });
  }, [socket]);
  
  const reserveQueue = () => {

  };
  useEffect(() => {

  }, [socket]);

  return (
    <div>
      <div>
        <label>이름: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>전화번호: </label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <button onClick={reserveQueue}>예약하기</button>
      <p>당신의 예약 위치: {position}</p>
    </div>
  );
};

export default CustomerPage;
