const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors'); // CORS 패키지를 추가

const app = express();

// CORS 미들웨어 설정
app.use(cors({
  origin: '*', // 리액트 앱의 주소
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

app.use(express.json());

const server = http.Server(app);
const io = socketIO(server, {
  cors: {
    origin: "*", // 리액트 앱의 주소
    methods: ["GET", "POST"]
  }
});

let buyerSocket = null;
let sellerSocket = null;

function onNewOrder(orderData){
  io.emit('new-order', orderData);
}

app.post('/new-order', (req, res) => {
  const orderData = req.body;
  onNewOrder(orderData);
  res.status(200).send('새 주문 도착');
});

io.on('connection', (socket) => {
  socket.on("register", (data) => {
    console.log('User connected');
    if(data.role === "buyer"){
      buyerSocket = socket;
    }else if(data.role === "seller"){
      sellerSocket = socket;
    }
  });
  
  socket.on('place-order', () => {
    if(sellerSocket) {
      sellerSocket.emit("new-order", { message: "새로운 주문이 도착했습니다." });
    }
  });

  socket.on('confirm-order', () => {
    if(buyerSocket) {
      buyerSocket.emit("order-confirmed");
    }
  });
});

server.listen(3030, () => {
  console.log('Server running on port 3030');
});
