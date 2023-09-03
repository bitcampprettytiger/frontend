import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Tackout = () => {
  const [reservationList, setReservationList] = useState([]);
  const phoneNumber = "1234567890"; // 구매자의 전화번호로 변경
  const socket = io('http://172.30.1.60:8081', { query: `phoneNumber=${phoneNumber}` });
  const [menuCount, setMenuCount] = useState(0); // 초기값으로 0 설정
  const [menuName, setMenuName] = useState(""); // 초기값으로 빈 문자열 설정
  useEffect(() => {
    // 서버에서 'update' 이벤트가 오면 예약 목록을 업데이트함.
    socket.on('update', (updatedReservationList) => {
      setReservationList(updatedReservationList);
    });

    socket.on('notification', (message) => {
      alert(message);
    });

    return () => {
      socket.off('update');
      socket.off('notification');
     };
   }, []);

   const handleOrderSubmit = () => {
    // 주문 제출 시 메뉴 이름과 개수를 배열로 만들어서 서버에 보내는 로직
    let orderArray = Array(menuCount).fill(menuName);

    // 여기서 orderArray를 소켓이나 API 요청 등으로 서버에 보낼 수 있습니다.
    console.log(orderArray); 
    socket.emit('order', { phoneNumber, orderArray });

  };

   return (
    <div>
      <input type="text" value={menuName} onChange={(e) => setMenuName(e.target.value)} placeholder="메뉴 이름" />
      <input type="number" value={menuCount} onChange={(e) => setMenuCount(e.target.value)} placeholder="개수" />
      <button onClick={handleOrderSubmit}>주문 제출</button>

      {reservationList.map((reservation, index) => (
        <div key={index}>
          <p>Vendor: {reservation.vendor}</p>
          <p>Name: {reservation.name}</p>
          <p>Phone Number: {reservation.phoneNumber}</p>
         </div>
       ))}
     </div>
  );
};

export default Tackout;
