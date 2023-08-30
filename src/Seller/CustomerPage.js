import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const CustomerPage = () => {
  const [position, setPosition] = useState(0);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const socket = io('http://192.168.0.77:8081'); // 서버 주소
  const [isReserved, setIsReserved] = useState(false);
  const [nickname, setNickname] = useState(""); // 닉네임 상태 추가

  useEffect(() => {
    socket.on('welcome', (nickname, roomCount) => {
      console.log(`${nickname}님, 환영합니다! 방 인원: ${roomCount}`);
      setPosition(prevPosition => prevPosition + 1);
    });
  }, [socket]);

  const reserveQueue = () => {
    if (!isReserved) {
      const data = {
        name: name,
        phoneNumber: phoneNumber
      };
      socket.emit('enter_room', data);

      // ... 나머지 로직은 그대로 유지 ...
    }
  };

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
