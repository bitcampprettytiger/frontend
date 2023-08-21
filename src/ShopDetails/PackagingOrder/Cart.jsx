import React, { useState } from 'react';
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
import { useNavigate, useLocation } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function CartPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuList, setMenuList] = useState(location.state ? location.state.addedMenus : []);
  const [selectIndex, setSelectIndex] = useState(-1);

  const onIncrease = (index) => {
    const newMenuList = [...menuList];
    newMenuList[index].quantity++;
    setMenuList(newMenuList);
  };

  const onDecrease = (index) => {
    const newMenuList = [...menuList];
    if (newMenuList[index].quantity <= 0) return;
    newMenuList[index].quantity--;
    setMenuList(newMenuList);
  };

  const onDelete = (index) => {
    const newMenuList = menuList.filter((item, idx) => idx !== index);
    setMenuList(newMenuList);
  };

  const onDeleteAll = () => {
    setMenuList([]);
  };

  const getTotalItems = () => {
    return menuList.reduce((sum, menu) => sum + menu.quantity, 0);
  };

  const renderOptionItem = (option, quantity) => {
    const choice = option.choices.find((c) => c.selected);
    return choice
      ? `${option.title}: ${choice.name} (${(choice.price * quantity).toLocaleString()}원)`
      : `${option.title}: 선택 없음`;
  };

  const getTotalPrice = () => {
    return menuList.reduce((sum, menu) => {
      const optionPrice = menu.options.reduce((subSum, option) => {
        const selectedChoice = option.choices.find((c) => c.selected);
        return subSum + (selectedChoice ? selectedChoice.price : 0);
      }, 0);
      return sum + (menu.price + optionPrice) * menu.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    navigate('/payment', {
      state: {
        totalAmount: getTotalPrice()
      },
    });
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="back"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon/>
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1, color: 'black' }} variant="h6" component="div">
            장바구니
          </Typography>
          <ShoppingCartIcon />
        </Toolbar>
      </AppBar>
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
            {menuList.map((menu, index) => (
              <Box key={menu.menuName}>
                <ListItem>
                  <ListItemText primary={menu.menuName} />
                  <ListItemText>{menu.price.toLocaleString()}원</ListItemText>
                  <ListItemText>
                    <IconButton
                      size="small"
                      onClick={() => onDecrease(index)}
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
                      onClick={() => onIncrease(index)}
                      sx={{
                        border: '1px solid #D9D9D9',
                        color: 'black',
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => onDelete(index)}>
                      <CloseIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {menu.options.map((option) => (
                  <ListItem key={option}>
                    <ListItemText secondary={renderOptionItem(option, menu.quantity)} />
                  </ListItem>
                ))}
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