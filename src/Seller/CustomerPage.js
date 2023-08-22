import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const CustomerPage = () => {
  const [position, setPosition] = useState(0);
  const socket = io('ws://localhost:8081'); // 서버 주소

  useEffect(() => {
    socket.on('message', message => {
      const parsedMessage = JSON.parse(message);
      setPosition(parsedMessage.position);
    });

    return () => {
      socket.disconnect(); // 컴포넌트 언마운트 시 소켓 연결 해제
    };
  }, [socket]);

  const reserveQueue = () => {
    // 예약 요청을 서버로 보내는 로직
    socket.emit('reserve', {});

    // 여기서는 임의로 위치를 증가시킴
    setPosition(prevPosition => prevPosition + 1);
  };

  return (
    <div>
      <button onClick={reserveQueue}>예약하기</button>
      <p>당신의 예약 위치: {position}</p>
    </div>
  );
};

export default CustomerPage;
