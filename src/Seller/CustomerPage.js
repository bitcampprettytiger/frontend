import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const CustomerPage = () => {
  const [position, setPosition] = useState(0);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const socket = io('http://192.168.0.58:8081'); // 서버 주소
  const [isReserved, setIsReserved] = useState(false);
  const [nickname, setNickname] = useState(""); // 닉네임 상태 추가
  const[vendor,setvendor] = useState("");
  useEffect(() => {
    socket.on('welcome', (nickname, roomCount) => {
      console.log(`${nickname}님, 환영합니다! 방 인원: ${roomCount}`);
    });
  }, [socket]);
  
  const reserveQueue = () => {
    const data = {
      vendor: "1", // 판매자 ID, 혹은 다른 값으로 변경해야 함
      name: name,
      phoneNumber: phoneNumber
    };
    console.log(name, phoneNumber);
  
    if (!isReserved) {
      socket.emit('enter_room', data);
      setIsReserved(true);
      // setPosition(prevPosition => prevPosition + 1);
      socket.on('reserved_position', (position) => {
        // 예약된 위치를 받아서 처리
        console.log(`당신은 ${position}번째 예약입니다.`);
        setPosition(position);
      });
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
