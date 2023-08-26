import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SellerPage = () => {
  const [reservationList, setReservationList] = useState([]);
  const socket = io('http://localhost:8081'); // 판매자 엔드포인트로 연결

  useEffect(() => {
    socket.on('message', message => {
      updateReservationList(message);
    });

    return () => {
      socket.disconnect(); // 컴포넌트 언마운트 시 소켓 연결 해제
    };
  }, [socket]);

  const updateReservationList = newReservation => {
    setReservationList(prevList => [...prevList, newReservation]);
  };

  const handleAccept = phoneNumber => {
    socket.emit('accept', phoneNumber);
  };


  const handleEdit = phoneNumber => {
    // 수정 버튼 클릭 시 처리 로직
    // 예를 들어, phoneNumber에 해당하는 예약을 찾아 수정하는 코드를 추가해주세요.
    // reservationList에서 phoneNumber에 해당하는 예약을 찾아 수정할 수 있도록 구현합니다.
    const updatedReservationList = reservationList.map(reservation => {
      if (reservation.phoneNumber === phoneNumber) {

        console.log(reservation.phoneNumber)
        // 수정할 내용을 반영하여 예약 객체를 수정합니다.
        // 예: reservation.position = newPosition;
        //     reservation.queueSize = newQueueSize;
      }
      return reservation;
    });
    setReservationList(updatedReservationList);
  };
  const handleDelete = phoneNumber => {
    // 삭제 버튼 클릭 시 처리 로직
    // reservationList에서 phoneNumber에 해당하는 예약을 찾아 삭제하는 코드를 추가해주세요.
    const updatedReservationList = reservationList.filter(reservation => reservation.phoneNumber !== phoneNumber);
    setReservationList(updatedReservationList);
  };


  return (
    <div>
      {reservationList.map((reservation, index) => (
        <div key={index}>
          <p>Position: {reservation.position}</p>
          <p>Queue Size: {reservation.queueSize}</p>
          <p>Phone Number: {reservation.phoneNumber}</p>
          <button onClick={() => handleAccept(reservation.phoneNumber)}>허용</button>
          <button onClick={() => handleEdit(reservation.phoneNumber)}>수정</button>
          <button onClick={() => handleDelete(reservation.phoneNumber)}>삭제</button>
        </div>
      ))}
    </div>
  );
};


export default SellerPage;
