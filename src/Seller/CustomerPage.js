import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const CustomerPage = () => {
  const [position, setPosition] = useState(0);
  const socket = io('http://localhost:8081'); // 서버 주소
  const [vendor,setVendor] = "1";
  useEffect(() => {
    socket.on('message', message => {
      const parsedMessage = JSON.parse(message);
      setPosition(parsedMessage.position);
    });

  }, [socket]);

  const reserveQueue = () => {
    
    // 서버로 socket.id와 position을 함께 보냄
    socket.emit('reserve', { socketId: socket.id, position,vendor});

    // 여기서는 임의로 위치를 증가시킴
    setPosition(prevPosition => prevPosition + 1);
    console.log(position);
  };

  return (
    <div>
      <button onClick={reserveQueue}>예약하기</button>
      <p>당신의 예약 위치: {position}</p>
    </div>
  );
};

export default CustomerPage;
