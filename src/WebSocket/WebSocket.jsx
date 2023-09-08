import React, { useEffect } from 'react';

const WebSocket = () => {
  useEffect(() => {
    // 웹소켓 전역 객체 생성
    const ws = new WebSocket("ws://192.168.0.208:3030");

    // 연결이 수립되면 서버에 메시지를 전송한다
    ws.on = (event) => {
      ws.send("Client message: Hi!");
    };

    // 서버로부터 메시지를 수신한다
    ws.onmessage = (event) => {
      console.log("Server message: ", event.data);
    };

    // 에러 이벤트 핸들러
    ws.onerror = (event) => {
      console.log("Server error message: ", event.data);
    };

    // 컴포넌트 unmount시에 웹소켓 연결을 닫는다.
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Example with React</h1>
    </div>
  );
};

export default WebSocketExample;
