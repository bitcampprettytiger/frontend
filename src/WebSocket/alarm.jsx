import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://mukjachi.site:6443:1004:3030');

function Alarm() {
    // 주문 목록을 관리하는 상태
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        //서버로부터 'new-order' 이벤트를 받으면
        socket.on("new-order", (order) => {
            setOrders((prevOrders) => [...prevOrders, order]);
            // 주문 정보를 사용하여 알림을 띄웁니다.
            alert(`새 주문 등록! ID: ${order.id},
                                Member: ${order.member},
                                `);
        });

        return () => {
            socket.off('new-order');
        };
    }, []);


    return (
        <div>
            <h2>New Orders</h2>
            <ul id="orders">
                {orders.map((order, index) => (
                    <li key={index}>{`Order ID: ${order.id}, Product: ${order.member}`}</li>
                ))}
            </ul>
        </div>
    );
}

export default Alarm;
