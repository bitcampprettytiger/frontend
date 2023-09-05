const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIO = require('socket.io'); // WebSocket 모듈 추가

const app = express();
app.use(cors());

const server = http.createServer(app); // http 서버 생성

const io = socketIO(server,{
  cors: {
    origin: "*", // 모든 출처 허용
    methods: ["GET", "POST"], // 허용하는 HTTP 메소드 지정
  }
}); 
let socketToVendor = new Map();
let phoneNumberToVendor = new Map(); // 각 전화번호가 어떤 판매자에게 연결되어 있는지 저장하는 맵
const phoneNumberToSocketId = new Map(); // 각 전화번호와 연결된 소켓 ID를 저장하는 맵


let sellerConnections = [];
let currentPosition = 0;
let vendorConnections = {};


function publicRooms() {
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = io;
  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
}

function countRoom(roomName) {
  return io.sockets.adapter.rooms.get(roomName)?.size;
}



io.on('connection', (socket) => {
  // console.log('새로운 소켓 연결:', socket.id); // 새로운 소켓 연결 시 로그 남김
  // console.log("한명 입장");
  // const userId = socket.handshake.query.userId; // 클라이언트가 보낸 userId 값 가져오기

  // socket.onAny((e) =>{
  //   console.log(`${e}`)
  // })
  const phoneNumber = socket.handshake.query.phoneNumber;
  if (phoneNumber) {
    phoneNumberToSocketId.set(phoneNumber, socket.id); // 소켓이 연결될 때 맵에 추가
  }

  
  socket.on("enter_room", (data) => { 

    socket.join(data.vendor); // 해당 vendor를 방 이름으로 사용
    socket.to(data.vendor).emit("welcome", socket.nickname, countRoom(data.vendor));
    socketToVendor.set(data.vendor,socket.id);
    phoneNumberToVendor.set(data.phoneNumber, data.vendor); // 전화번호와 vendor ID를 맵에 저장
    io.sockets.emit("room_change", data.vendor); // vendor를 방 이름으로 전달
    // io.sockets.emit("room_change", publicRooms());
  
    io.to(data.vendor).emit('custom_event', data);
    io.to(data.vendor).emit('message', data);

    const reservedPosition = countRoom(data.vendor);
    console.log("reservedPosition"+reservedPosition);
    socket.emit('reserved_position', reservedPosition);
    vendorConnections[data.phoneNumber] = socket;
    console.log("data.vendor"+data.vendor)
    // io.to("1").emit('update_position', 100);





  });

  socket.on('disconnect_user', (phoneNumber) => {
    console.log("이벤트발생!!")
    // 현재 소켓의 vendor ID 가져오기
    const vendorId = phoneNumberToVendor.get(phoneNumber); // 현재 전화번호의 vendor ID 가져오기
    // console.log(countRoom(data.vendor));
    console.log(vendorId);
    // io.to(vendorId).emit('update_position', updatedPosition);
    console.log(phoneNumber);
    // 클라이언트에서 전달한 phoneNumber를 기반으로 연결을 찾아서 끊음
    const connectedSocket = vendorConnections[phoneNumber];
    console.log("connectedSocket");
    if (connectedSocket) {
      connectedSocket.disconnect();
      delete vendorConnections[phoneNumber];
    }
    const updatedPosition = countRoom(vendorId); // 업데이트된 위치 계산
    console.log(updatedPosition);
    io.sockets.emit('update_position', countRoom(vendorId));
    // io.to(data.vendor).emit('message', data);

    const reservedPosition = countRoom(vendorId);
    console.log(reservedPosition);    console.log(reservedPosition);
    // io.to(vendorId).emit('update_position', reservedPosition); // 클라이언트에게 갱신된 position 값 전송
  });

  
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    // 필요한 추가 조치 수행

    if (phoneNumber) {
      phoneNumberToSocketId.delete(phoneNumber); // 소켓이 연결 해제될 때 맵에서 제거
    }
  });

  socket.on('notification', (messageInfo) =>{
    // 구매자에게 알리기 위해 소켓 통신으로 메시지 보내기

    console.log(messageInfo.message);

    const buyerSocketId = phoneNumberToSocketId.get(messageInfo.phoneNumber);
    
    if(buyerSocketId){
      io.to(buyerSocketId).emit("notification", messageInfo.message); 
     }
    
});
socket.on('order', ({  phoneNumber, orderArray, cartItems }) => {
  console.log(orderArray);
  console.log(orderArray.payMethod);
  if (Array.isArray(orderArray)) {
    // orderArray가 배열인 경우
    for (let order of orderArray) {
    const roomName = phoneNumber + "room" + String(order.vendorId);
    socket.join(roomName);
    socket.join(String(order.vendorId));
    console.log(order);
    console.log(String(order.vendorId));
    // 해당 vendorId 방의 다른 모든 클라이언트들에게 주문 정보 전송
    socket.broadcast.to(String(order.vendorId)).emit('new_order', { phoneNumber, order ,cartItems});

    // 각 전화번호가 마지막으로 보낸 주문 정보 저장
    phoneNumberToVendor.set(phoneNumber, { socket, order });

    console.log(`Socket joined to the room: ${roomName}`);
  }
}else{
  const roomName = phoneNumber + "room" + String(orderArray.vendorId);
  socket.join(roomName);
  socket.join(String(orderArray.vendorId));
  console.log(orderArray);
  console.log(String(orderArray.vendorId));
  // 해당 vendorId 방의 다른 모든 클라이언트들에게 주문 정보 전송
  socket.broadcast.to(String(orderArray.vendorId)).emit('new_order', { phoneNumber, orderArray,cartItems });

  // 각 전화번호가 마지막으로 보낸 주문 정보 저장
  phoneNumberToVendor.set(phoneNumber, { socket, orderArray });

  console.log(`Socket joined to the room: ${roomName}`);
}

});
socket.on("enter_room", (data) => { 
  const vendorId = parseInt(data.data); // 문자열을 정수로 변환
  console.log(vendorId); // 14
  socket.join(String(vendorId)); // 해당 vendor를 방 이름으로 사용
});

});

const port = 8081;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});