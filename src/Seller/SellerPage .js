import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SellerPage = () => {
  const phoneNumber  = '1';
  const [reservationList, setReservationList] = useState([]);
  const [reservationList2, setReservationList2] = useState([]);
  
  const socket = io('http://192.168.0.63:8081', {
    query: { phoneNumber  }
  });

  const [position, setPosition] = useState(0);
  const [isReserved, setIsReserved] = useState(false);

  const data = {
    vendor: "1", // 판매자 ID, 혹은 다른 값으로 변경해야 함
    name: "name",
    phoneNumber: "phoneNumber"
  };

  useEffect(() => {
    if (!isReserved) {
      socket.emit('enter_room', data);
      setIsReserved(true);
      setPosition(prevPosition => prevPosition + 1);
    }

    socket.on('disconnect', () => {
      alert('소켓 연결이 끊어졌습니다. 네트워크 상태를 확인해주세요.');
    });

    socket.on('welcome', (nickname, roomCount) => {
      console.log(`${nickname}님, 환영합니다! 방 인원: ${roomCount}`);
      // 이제 환영 메시지를 받아서 처리하는 로직을 추가할 수 있습니다.
    });

    socket.on('message', (data) => {
      setReservationList(prevReservationList => [...prevReservationList, data]);
    });

    socket.on('new_order', ({ phoneNumber, orderArray }) => {
      alert(`새로운 주문이 도착했습니다! 구매자: ${phoneNumber}, 주문 내역: ${orderArray.join(', ')}`);

      setReservationList2(prevState =>
        [...prevState, { vendor: 'Vendor ID here', name: 'Name here', phoneNumber, items: orderArray }]
      );
    });
    socket.on('update', (updatedReservationList) => {
      setReservationList(updatedReservationList);
    });

    return () => {
      socket.off('update');
      socket.off('disconnect');
      socket.off('new_order');
    };
  }, [socket]);

  const handleDisconnect = (phoneNumber) => {

    // 클라이언트와의 연결을 끊는 로직 구현
    // phoneNumber를 기반으로 연결을 찾아서 끊을 수 있도록 해야 합니다.
    // 아래는 가상의 예시입니다.

    socket.emit('disconnect_user', phoneNumber);

    setReservationList(prevState =>
      prevState.filter(reservation => reservation.phoneNumber !== phoneNumber)
    );
  };

  const handleConfirmReject = (index, statusMessage) => {

    // 확인 버튼 클릭 시 해당 예약 정보 처리 및 알림 메시지 전송 로직 추가
    let updatedReservations = [...reservationList2];
    updatedReservations[index].status = statusMessage;

    let emitEvent = statusMessage === "확인됨" ? "confirm" : "reject";

    // 서버로 업데이트된 예약 정보 전송
    socket.emit(emitEvent, updatedReservations);

    // 알림 메시지 전송
    let messageInfo = {
      phoneNumber: reservationList2[index].phoneNumber,
      message: `주문이 ${statusMessage}되었습니다.`
    };

    socket.emit("notification", messageInfo);
  }

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
      {reservationList2.map((reservation, index) => (
        <div key={index}>
          <p>Vendor: {reservation.vendor}</p>
          <p>Name: {reservation.name}</p>

          {/* 확인 및 거절 버튼에 대한 핸들러를 간소화 */}
          {/* 상태 메시지를 인자로 전달하여 처리 */}

          <button onClick={() => handleConfirmReject(index, "확인됨")}>확인</button>
          <button onClick={() => handleConfirmReject(index, "거절됨")}>거절</button>

        </div>
      ))}

    </div>
  );
};

export default SellerPage;