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

  const getTotalPrice = () => {
    return menuList.reduce(
      (sum, menu) => sum + menu.quantity * menu.price,
      0
    );
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
                  <ListItemText primary={menu.menuName}>
                    <CloseIcon onClick={() => onDelete(index)} />
                  </ListItemText>
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
                </ListItem>
                {menu.options.map((option) => (
                  <ListItem key={option}>
                    <ListItemText secondary={option} />
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
          총 금액: {getTotalPrice().toLocaleString()}원
        </Typography>
        <Button
          onClick={() => navigate('/checkout')} // 실제 결제 페이지 경로로 변경해야 합니다.
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
