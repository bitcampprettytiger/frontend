import React, { useEffect } from 'react';
import {
  AppBar,
  Toolbar,
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
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import useCart from '../MenuCustomHook/useCart';
import { useParams } from 'react-router-dom';
import AppBarWithTitle from '../../../Components/AppBarWithTitle';

function CartPage() {
  const navigate = useNavigate();
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

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
  };


  const handleCheckout = () => {
    navigate('/payment', {
      state: {
        totalAmount: getTotalPrice(),
        orderMenus : cartItems
      },
    });
  };

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
            onClick={handleCheckout}
          sx={{
            backgroundColor: '#FF745A',
            width: '70vw',
            height: '48px',
            color: 'white',
            fontSize: '17px',
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