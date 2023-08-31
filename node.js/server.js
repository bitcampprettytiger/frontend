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

  socket.on("enter_room", (data) => { 
    socket.join(data.vendor); // 해당 vendor를 방 이름으로 사용
    socket.to(data.vendor).emit("welcome", socket.nickname, countRoom(data.vendor));
    socketToVendor.set(socket.id, data.vendor);
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
});

const port = 8081;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});