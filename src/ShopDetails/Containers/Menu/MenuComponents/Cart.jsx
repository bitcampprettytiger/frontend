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
import AppBarWithTitle from '../../../Components/AppBarWithTitle';
import useResponsive from '../../../SDCustomHooks/useResponsive';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function CartPage() {
  const {
    cartItems,
    clearCart,
    deleteCartItem,
    setCartItems
  } = useCart();
  //수량 + (미완)
  const onIncrease = (menuId) => {
    const newCartItems = cartItems.map(item => {
      if (item.menuId === menuId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(newCartItems);
  };
  //수량 - (미완)
  const onDecrease = (menuId) => {
    const newCartItems = cartItems.map(item => {
      if (item.menuId === menuId && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1 };
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
    clearCart();
  };

  //전체 메뉴 개수 (미완)
  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };
  //전체 가격 (미완)
  const getTotalPrice = () => {
    return cartItems.length > 0 ? cartItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0) : 0;
  };
  const { width } = useResponsive();

  //아임포트 (결제요청하기, 결제 가능, 결제 완료 처리 미완)
  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init('imp45381601');

    const data = {
      pg: 'html5_inicis',
      pay_method: 'card',
      merchant_uid: "A0" + new Date().getTime(),
      amount: getTotalPrice,
      name: "주식회사 먹자취",
      m_redirect_url: '/Paid'
    };
    IMP.request_pay(data, callback);

  };

  const callback = (rsp) => {
    const { scuccess, error_msg } = rsp;

    if (rsp.success) {
      alert('결제가 성공적으로 완료되었습니다.');
    } else {
      alert(`결제 실패: ${rsp.error_msg}`);
    }
  }

  return (
    <>
      <CssBaseline />
      {/* <AppBarWithTitle title='장바구니' /> */}
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
            {cartItems && cartItems.map((cartItem) => (
              <Box key={cartItem.menu.id}>
                <ListItem>
                  <ListItemText primary={cartItem.menu.menuName} />
                  <ListItemText>
                    {cartItem.menu.price ? cartItem.menu.price.toLocaleString() : '0'}원
                  </ListItemText>
                  <ListItemText>
                    <IconButton
                      size="small"
                      onClick={() => onDecrease(cartItem.cartQuantity)}
                      sx={{
                        border: '1px solid #D9D9D9',
                        color: 'black',
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    {cartItem.cartQuantity}
                    <IconButton
                      size="small"
                      onClick={() => onIncrease(cartItem.cartQuantity)}
                      sx={{
                        border: '1px solid #D9D9D9',
                        color: 'black',
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => onDelete(cartItem.cart.id, cartItem.menu.id)}>
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
          {/* {getTotalPrice() ? getTotalPrice().toLocaleString() : '0'}원 */}

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
          }}
        >
          결제하기  
          <ShoppingCartIcon sx={{marginLeft: '5%'}}/>
        </Button>
      </Box>
    </>
  );
}

export default CartPage;