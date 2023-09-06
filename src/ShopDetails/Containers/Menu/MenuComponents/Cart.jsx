import React, { useState ,useEffect} from 'react';
import {
  Typography,
  IconButton,
  Divider,
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  ListItemSecondaryAction,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import useCart from '../MenuCustomHook/useCart';
import AppBarWithTitle from '../../../Components/AppBarWithTitle';
import useResponsive from '../../../SDCustomHooks/useResponsive';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import { da } from 'date-fns/locale';
import CardModal from './CardModal';
import { redirect, useNavigate } from 'react-router-dom/dist';
import { io } from 'socket.io-client';
import { useLocation } from 'react-router-dom';
function CartPage() {
  const location = useLocation();
  const vendorId = location.state?.vendorId; // state에서 vendorId 가져오기
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const [showModal, setShowModal] = useState(false);
  const [paymentOK, setpaymentOK] = useState(false);
  const [phoneNumber,setPhoneNumber] = useState(null); // 초기값을 null로 설정
  const [socket, setSocket] = useState(null); // socket state 추가
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };
  const [menuCount, setMenuCount] = useState(0); // 초기값으로 0 설정
  const [menuName, setMenuName] = useState(""); // 초기값으로 빈 문자열 설정
  const getHeaders = () => {
    const accessToken = localStorage.getItem('accessToken');
    return {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${accessToken}`,
    };
  };
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get('http://192.168.0.63/member/info', { headers: getHeaders() });
      console.log(response);
      if (response.status === 200) {
        setPhoneNumber(response.data.tel);
      }
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };
  
  useEffect(() => {
    const socket = io('http://192.168.0.63:8081', { query: `phoneNumber=${phoneNumber}` });
    setSocket(socket);
    fetchUserInfo();


    return () => socket.close(); 
  }, [phoneNumber]);

  const { cartItems, clearCart, deleteCartItem, setCartItems } = useCart();
  // 수량 +
  useEffect(() => {
    console.log('주문하기 벤더아이디 ===============', vendorId);
  }, []);

  const onIncrease = (menuId) => {
    const newCartItems = cartItems.map((item) => {
      if (item.menu.id === menuId) {
        return { ...item, cartQuantity: item.cartQuantity + 1 };
      }
      return item;
    });

    setCartItems(newCartItems);
    console.log('카트아이템', newCartItems);
  };

  // 수량 -
  const onDecrease = (menuId) => {
    const newCartItems = cartItems.map((item) => {
      if (item.menu.id === menuId && item.cartQuantity > 0) {
        return { ...item, cartQuantity: item.cartQuantity - 1 };
      }
      return item;
    });
    setCartItems(newCartItems);
  };

  //선택 삭제
  const onDelete = (cartId, menuId) => {
    deleteCartItem(cartId, menuId);
  };
  //전체 삭제
  const onDeleteAll = () => {
    console.log('Sssssss');
    clearCart();
  };

  //전체 메뉴 개수 (완)
  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.cartQuantity, 0);
  };
  //전체 가격 (완)
  const getTotalPrice = () => {
    return cartItems.length > 0
      ? cartItems.reduce((sum, item) => {
        return sum + item.menu.price * item.cartQuantity;
      }, 0)
      : 0;
  };
  const { width } = useResponsive();

  //아임포트 (결제요청하기, 결제 가능, 결제 완료 처리 미완)
  const onClickPayment = async () => {
    const { IMP } = window;
    IMP.init('imp45381601');
    
    const data = {
      pg: 'html5_inicis',
      pay_method: 'card',
      merchant_uid: 'A0' + new Date().getTime(),
      amount: getTotalPrice(),
      name: '주식회사 먹자취',
      m_redirect_url: '/Paid',
    };
    IMP.request_pay(data, callback);
  };
  
  const callback = async (rsp) => {
    const {
      success,
      imp_uid,
      merchant_uid,
      paid_amount,
      error_msg,
      name,
      paymentOK,
    } = rsp;
    console.log('rsp@@@', rsp);
    
    //페이먼트 아이디
    console.log('콜백 벤더아이디@@@@@@@@@@@@@@@@@@@@', rsp);
    console.log('콜백ㄱㄱㄱㄱㄱㄱㄱㄱㄱ', vendorId); //페이먼트 아이디
    //벤더아이디
    
    // if (success) {
      setShowModal(true); // 결제 성공 시 모달 표시
      const payload = {
        payMethod: 'card',
        impUid: imp_uid,
        merchantUid: merchant_uid,
        amount: paid_amount,
        name: name,
        paymentOK: paymentOK,
        vendorId: vendorId,
        
      };
      console.log('페이로드', payload);
      try {
        // 서버로 데이터를 전송합니다.
        const serverResponse = await axios.post(
          'http://192.168.0.63/payment/addPayment',
          payload,
          { headers }
          );
          setpaymentOK(true);
          console.log('서버 응답:', serverResponse);
          console.log("phoneNumber"+phoneNumber);
          console.log("serverResponse"+serverResponse)
          // if (socket) socket.emit('order', { phoneNumber, serverResponse });

          
          if (socket) socket.emit('order', { phoneNumber, orderArray: serverResponse.data.item , cartItems: cartItems});
          
        } catch (error) {
          console.error('서버로 전송 실패:', error);
        }
    // }
    //  else {
      alert(`결제 실패: ${error_msg}`);
    // }
  };
  const onModalConfirm = () => {
    setShowModal(false); // 모달 닫기
    navigate('/home'); // /home으로 이동
    // 여기에 이전 페이지로 이동하는 코드를 작성하세요. 예: history.goBack()
  };
  return (
    <>
      <Container style={{ border: '1px solid #ff0000', height: '100vh', padding:'0' }}>
      <AppBarWithTitle title="장바구니" />
        <Box sx={{ my: 2,  height: '70vh', padding: '5%'}}>
          <Typography variant="h6" gutterBottom component="div">
            총 {getTotalItems()}개의 메뉴
          </Typography>
          <Button
            size="small"
            variant="outlined"
            onClick={onDeleteAll}
            sx={{ marginBottom: 2
            , border: '1px solid #ff0000',
          color: '#FD5E53' ,
          '&:hover': {
            backgroundColor: '#FD5E53',
            color: 'white',
            border: '1px solid #FD5E53',
          },
          '&:active': {
            backgroundColor: '#FD5E53',
            color: 'white',
            border: '1px solid #FD5E53',
          }}}
          >
            전체 삭제
          </Button>
          <List>
            {cartItems &&
              cartItems.map((cartItem) => (
                <Box key={cartItem.menu.id}>
                  <ListItem>
                    <Grid container spacing={3}>
                      <Grid item xs={5}>
                        <ListItemText primary={cartItem.menu.menuName} />
                      </Grid>
                      <Grid item xs={3}>
                        <ListItemText>
                          {cartItem.menu.price
                            ? cartItem.menu.price.toLocaleString()
                            : '0'}
                          원
                        </ListItemText>
                      </Grid>
                      <Grid item xs={3}>
                        <IconButton
                          size="small"
                          onClick={() => onDecrease(cartItem.menu.id)}
                          sx={{
                            border: '1px solid #D9D9D9',
                            color: 'black',
                            marginRight: '10%',
                            padding: '5px', // 패딩을 줄입니다.
                            fontSize: '0.8rem', // 아이콘의 크기를 줄입니다.
                          }}
                        >
                          <RemoveIcon fontSize="inherit" />
                        </IconButton>
                        {cartItem.cartQuantity}
                        <IconButton
                          size="small"
                          onClick={() => onIncrease(cartItem.menu.id)}
                          sx={{
                            border: '1px solid #D9D9D9',
                            color: 'black',
                            marginLeft: '10%',
                            padding: '5px', // 패딩을 줄입니다.
                            fontSize: '0.8rem', // 아이콘의 크기를 줄입니다.
                          }}
                        >
                          <AddIcon fontSize="inherit" />
                        </IconButton>
                      </Grid>
                      <Grid item xs={1}>
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={() =>
                              onDelete(cartItem.cart.id, cartItem.menu.id)
                            }
                          >
                            <CloseIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider
                    sx={{
                      my: 0,
                      height: '0.5px',
                      bgcolor: '#E7E3E3',
                    }}
                  />
                </Box>
              ))}
          </List>
        </Box>
      </Container>
      <Box
      position= 'absolute'
        sx={{
          bottom: 0,
          width: width,
          left: `calc((100% - ${width}) / 2)`,
          right: `calc((100% - ${width}) / 2)`,
          borderTop: '1px solid #E7E3E3',
          height: '20vh',
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ mb: 2 }} variant="h6">
          {getTotalPrice() ? getTotalPrice().toLocaleString() : '0'}원
        </Typography>
        <Button
          onClick={onClickPayment}
          sx={{
            backgroundColor: '#FF745A',
            width: '90%',
            height: '30%',
            color: 'white',
            fontSize: '110%',
            position: 'relative',
            marginBottom: '0',
            '&:hover': {
              backgroundColor: '#f1eceb',
              border: '1px solid #FD5E53',
              color: 'black'
            },
            '&:active': {
              backgroundColor: '#f1eceb',
              borderColor: '1px solid #FD5E53',
              color: 'black'
            }
          }}
        >
          결제하기
          <ShoppingCartIcon sx={{ marginLeft: '5%' }} />
        </Button>
      </Box>
      <CardModal show={showModal} onClose={onModalConfirm} />
    </>
  );
}

export default CartPage;
