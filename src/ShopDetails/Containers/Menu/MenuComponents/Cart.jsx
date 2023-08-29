import React, { useEffect } from 'react';
import {
  Typography,
  IconButton,
  CssBaseline,
  Divider,
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  ListItemSecondaryAction
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import useCart from '../MenuCustomHook/useCart';
import { useParams } from 'react-router-dom';
import AppBarWithTitle from '../../../Components/AppBarWithTitle';

function CartPage() {
  const memberId = useParams();
  const {
    cartItems,
    clearCart,
    deleteCartItem,
    fetchCartItems,
    setCartItems
  } = useCart();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const onIncrease = (menuId) => {
    const newCartItems = cartItems.map(item => {
      if (item.menuId === menuId) {
        return {...item, quantity: item.quantity + 1};
      }
      return item;
    });
    setCartItems(newCartItems);
  };

  const onDecrease = (menuId) => {
    const newCartItems = cartItems.map(item => {
      if (item.menuId === menuId && item.quantity > 0) {
        return {...item, quantity: item.quantity - 1};
      }
      return item;
    });
    setCartItems(newCartItems);
  };

  const onDelete = (menuId) => {
    deleteCartItem(menuId);
  };

  const onDeleteAll = () => {
    clearCart();
  };

  //전체 메뉴
  const getTotalItems = () => {
    return cartItems.length > 0 ? cartItems.reduce((sum, item) => sum + item.quantity, 0) : 0;
  };
  //전체 가격
  const getTotalPrice = () => {
    return cartItems.length > 0 ? cartItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0) : 0;
  };

  //아임포트
  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init('imp45381601'); 
  
      const data = {
        pg: 'html5_inicis',
        pay_method : 'card',
        murchant_uid: "A0"+ new Date().getTime(),
        amount: getTotalPrice(),
        name: "주식회사 먹자취",
        m_redirect_url : '/Paid'
      };
      IMP.request_pay(data, callback);
    
    };

    const callback = (rsp) => {
      const {scuccess, error_msg} = rsp;
  
      if (rsp.success) {
        alert('결제가 성공적으로 완료되었습니다.');
      } else {
        alert(`결제 실패: ${rsp.error_msg}`);
      }
    }

  return (
    <>
      <CssBaseline />
      <AppBarWithTitle title='장바구니'/>
      <Container>
        <Box sx={{ my: 2 }}>
          <Typography variant="h6" gutterBottom component="div">
            총 {getTotalItems()}개의 메뉴
          </Typography>
          <Button
            size="small"
            variant="outlined"
            onClick={onDeleteAll}
            sx={{ marginBottom: 2 }}
          >
            전체 삭제
          </Button>
          <List>
          {cartItems.map((menu) => (
            <Box key={menu.menuId}>
              <ListItem>
                  <ListItemText primary={menu.menuName} />
                  <ListItemText>{menu.price.toLocaleString()}원</ListItemText>
                  <ListItemText>
                    <IconButton
                      size="small"
                      onClick={() => onDecrease(menu.menuId)}
                      sx={{
                        border: '1px solid #D9D9D9',
                        color: 'black',
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    {menu.quantity}
                    <IconButton
                      size="small"
                      onClick={() => onIncrease(menu.menuId)}
                      sx={{
                        border: '1px solid #D9D9D9',
                        color: 'black',
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </ListItemText>
                  <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => onDelete(menu.menuId)}>
                    <CloseIcon />
                  </IconButton>
                </ListItemSecondaryAction>
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
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
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
          총 금액 {getTotalPrice().toLocaleString()}원
        </Typography>
        <Button
            onClick={onClickPayment}
          sx={{
            backgroundColor: '#FF745A',
            width: '70vw',
            height: '25%',
            color: 'white',
            fontSize: '110%',
            position: 'relative',
            marginBottom: '16px',
          }}
        >
          결제하기
        </Button>
      </Box>
    </>
  );
}

export default CartPage;