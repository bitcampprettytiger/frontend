import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SellerPage = () => {
  const [position, setPosition] = useState(0);
  const [queueSize, setQueueSize] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    const socket = io('ws://localhost:8081/socket.io'); // 서버 주소

    socket.addEventListener('open', () => {
      console.log('Connected to server');
    });

    socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      updateUI(message.position, message.queueSize, message.phoneNumber);
    });

    return () => {
      socket.close(); // 컴포넌트 언마운트 시 소켓 연결 해제
    };
  }, []);

  const updateUI = (newPosition, newQueueSize, newPhoneNumber) => {
    setPosition(newPosition);
    setQueueSize(newQueueSize);
    setPhoneNumber(newPhoneNumber);
  };

  return (
    <div>
      <p>Position: {position}</p>
      <p>Queue Size: {queueSize}</p>
      <p>Phone Number: {phoneNumber}</p>
    </div>
  );
};

export default SellerPage;