import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Buyer = () => {
  const [socket, setSocket] = useState(null);
  const [orderStatus, setOrderStatus] = useState(false);

  useEffect(() => {
    const newSocket = io('http://192.168.0.240:3030');
    setSocket(newSocket);

    newSocket.emit("register", { role: "buyer" });

    newSocket.on("order-confirmed", () => {
      setOrderStatus(true);
      alert('판매자가 주문을 확인했습니다. 준비중...');
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const handleOrder = () => {
    setOrderStatus("Order Placed");
    //주문 이벤트를 서버에 전달
    socket.emit("place-order");
  };

  return (
    <div>
      <h1>Buyer</h1>
      <button onClick={handleOrder}>Place Order</button>
      <p>Status: {orderStatus}</p>
    </div>
  );
};

export default Buyer;
