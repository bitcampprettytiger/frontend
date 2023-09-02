const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
app.use(express.json());

const server = http.createServer(app);
const io = socketIO(server, {path: '/socket.io'});

//localhost:3000으로 서버에 접속하면 클라이언트로 WebSoket.jsx 전송
app.get('/', function(req, res){
  res.sendFile(__dirname + '/WebSocket.jsx');
});

//주문이 들어오면 실행될 코드
//주문 정보와 함께 'new-order' 이벤트를 전송
//실제 데이터베이스 로직과 연결되는 부분
function onNewOrder(orderData){
  io.emit('new-order', orderData);
}

//API 엔드포인트 설정
app.post('/new-order', (req, res) => {
    //주문 정보를 받아옴
    const orderData = req.body;
    //소켓을 통해 주문 정보를 전송
    onNewOrder(orderData);
    //HTTP 응답
    res.status(200).send('새 주문 도착');
});

// socket io 객체의 이벤트 리스너 설정
    // 1) 연결 성공 이벤트: "socket.io 객체"로 "connect" 이벤트 처리
io.on('connection', (socket) => {
  console.log('User connected');
  // 2) 연결 종료 이벤트: "매개변수로 들어온 socket"으로 처리해야 함 주의!
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
