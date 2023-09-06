import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Seller = () => {
  const [socket, setSocket] = useState(null);
  const [newOrder, setNewOrder] = useState(false);

  useEffect(() => {
    const newSocket = io('https://mukjachi.site:6443:3030');
    setSocket(newSocket);

    newSocket.emit("register", { role: "seller" });

    newSocket.on("new-order", () => {
      setNewOrder(true);
      alert('새로운 주문이 들어왔습니다.');
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const handleConfirmOrder = () => {
    setNewOrder(false);
    // 주문 수락 이벤트를 서버에 전달
    socket.emit("confirm-order");
  };

  return (
    <div>
      <h1>Seller</h1>
      {newOrder ? (
        <button onClick={handleConfirmOrder}>Confirm Order</button>
      ) : (
        <p>No New Orders</p>
      )}
    </div>
  );
};

export default Seller;
