import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SellerPage = () => {
  const userId = '1';
  const [reservationList, setReservationList] = useState([]);
  const socket = io('http://192.168.0.77:8081', {
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

    // socket.on('message', message => {
    //   console.log(message);
    //   updateReservationList(JSON.parse(message)); // 서버에서 받은 메시지를 객체로 변환하여 예약 목록 갱신
    // });

    // return () => {
    //   socket.disconnect(); // 컴포넌트 언마운트 시 소켓 연결 해제
    // };
    
  }, [socket]);










  // const updateReservationList = newReservation => {
  //   setReservationList(prevList => [...prevList, newReservation]); // 새로운 예약 정보를 기존 목록에 추가하여 갱신
  // };

  // const handleAccept = phoneNumber => {
  //   socket.emit('accept', phoneNumber); // 예약 허용 요청을 서버로 전송
  // };

  // const handleEdit = phoneNumber => {
  //   // 수정 버튼 클릭 시 처리 로직
  //   const updatedReservationList = reservationList.map(reservation => {
  //     if (reservation.phoneNumber === phoneNumber) {
  //       // TODO: 서버로 수정 요청 보내기
  //       const newData = {
  //         newPosition: reservation.position + 1, // 위치 증가
  //         newQueueSize: reservation.queueSize - 1, // 대기열 크기 감소
  //       };

  //       fetch(`http://localhost:8081/edit-reservation/${phoneNumber}`, {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(newData),
  //       })
  //       .then(response => response.text())
  //       .then(message => {
  //         console.log(message);
  //         // 클라이언트에서도 예약 정보 업데이트
  //         reservation.position = newData.newPosition;
  //         reservation.queueSize = newData.newQueueSize;
  //         setReservationList([...reservationList]); // 리스트 갱신
  //       })
  //       .catch(error => {
  //         console.error('Error editing reservation:', error);
  //       });
  //     }
  //     return reservation;
  //   });
  //   setReservationList(updatedReservationList); // 수정된 리스트로 갱신
  // };

  // const handleDelete = phoneNumber => {
  //   // 삭제 버튼 클릭 시 처리 로직
  //   const updatedReservationList = reservationList.filter(
  //     reservation => reservation.phoneNumber !== phoneNumber
  //   );

  //   fetch(`http://localhost:8081/delete-reservation/${phoneNumber}`, {
  //     method: 'DELETE',
  //   })
  //   .then(response => response.text())
  //   .then(message => {
  //     console.log(message);
  //     setReservationList(updatedReservationList); // 리스트 갱신
  //   })
  //   .catch(error => {
  //     console.error('Error deleting reservation:', error);
  //   });
  // };

  return (
    <div>
      {reservationList.map((reservation, index) => (
        <div key={index}>
          <p>Vendor: {reservation.vendor}</p>
          <p>Name: {reservation.name}</p>
          <p>Phone Number: {reservation.phoneNumber}</p>
          {/* 추가: 예약 정보에 관련된 데이터를 출력 */}
          {/* <p>Store ID: {reservation.storeId}</p>
          <p>User Name: {reservation.userName}</p> */}
          {/* <button onClick={() => handleAccept(reservation.phoneNumber)}>허용</button>
          <button onClick={() => handleEdit(reservation.phoneNumber)}>수정</button>
          <button onClick={() => handleDelete(reservation.phoneNumber)}>삭제</button> */}
        </div>
      ))}
    </div>
  );
};

export default SellerPage;