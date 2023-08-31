import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SellerPage = () => {
  const userId = '1';
  const [reservationList, setReservationList] = useState([]);
  const socket = io('http://192.168.0.58:8081', {
    query: { userId }
  });
  const [position, setPosition] = useState(0);
  const [isReserved, setIsReserved] = useState(false);
  const data = {
    vendor: "1", // 판매자 ID, 혹은 다른 값으로 변경해야 함
    name: "name",
    phoneNumber: "phoneNumber"
  };

  useEffect(() => {
    // const socket = io('http://localhost:8081'); // 판매자 엔드포인트로 연결
    if(!isReserved){
    socket.emit('enter_room', data);
    setIsReserved(true);
    setPosition(prevPosition => prevPosition + 1);
  }
    socket.on('welcome', (nickname, roomCount) => {
      console.log(`${nickname}님, 환영합니다! 방 인원: ${roomCount}`);
      // 이제 환영 메시지를 받아서 처리하는 로직을 추가할 수 있습니다.
    });
    socket.on('message', (data) => {
      setReservationList(prevReservationList => [...prevReservationList, data]);

    });
  }, [socket]);

  const handleDisconnect = (phoneNumber) => {
    console.log(phoneNumber)
    // 클라이언트와의 연결을 끊는 로직 구현
    // phoneNumber를 기반으로 연결을 찾아서 끊을 수 있도록 해야 합니다.
    // 아래는 가상의 예시입니다.
    socket.emit('disconnect_user', phoneNumber);
    setReservationList(prevReservationList =>
      prevReservationList.filter(reservation => reservation.phoneNumber !== phoneNumber)
    );
  };
  return (
    <div>
      {reservationList.map((reservation, index) => (
        <div key={index}>
          <p>Vendor: {reservation.vendor}</p>
          <p>Name: {reservation.name}</p>
          <p>Phone Number: {reservation.phoneNumber}</p>
         <button onClick={() => handleDisconnect(reservation.phoneNumber)}>
            연결 끊기
          </button>
        </div>
      ))}
    </div>
  );
};

export default SellerPage;
