import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Button,
  Typography,
  Checkbox,
  TextField,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';

const SellMyList = () => {
  // useParams를 통해 URL 파라미터에서 vendorId를 가져옵니다.
  const { vendorId } = useParams();

  // 메뉴와 품절 상태를 관리하는 상태 변수를 선언합니다.
  const [menus, setMenus] = useState([]);
  const [outOfStock, setOutOfStock] = useState({});

  // 품절 상태를 변경하는 함수입니다.
  const handleStockChange = (e, index) => {
    setOutOfStock({
      ...outOfStock,
      [index]: e.target.checked,
    });
  };

  // 메뉴를 삭제하는 함수입니다.
  const handleDelete = (index) => {
    const updatedMenus = [...menus];
    updatedMenus.splice(index, 1);
    setMenus(updatedMenus);
  };

  // 메뉴 리스트가 변경될 때마다 품절 상태를 초기화하는 useEffect입니다.
  useEffect(() => {
    let initialStock = {};
    menus.forEach((menu, index) => {
      initialStock[index] = false;
    });
    setOutOfStock(initialStock);
  }, [menus]);

  // 가격을 형식화하는 함수입니다.
  const formatPrice = (price) =>
    `${parseInt(price, 10).toLocaleString('ko-KR')}원`;

  // MUI 테마를 설정합니다.
  const theme = createTheme({
    typography: {
      fontFamily: 'NanumSquareRound, Arial, sans-serif',
    },
  });

  // 로컬 스토리지에서 액세스 토큰을 가져옵니다.
  const accessToken = localStorage.getItem('accessToken');

  // 컴포넌트가 마운트될 때 메뉴 데이터를 가져옵니다.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://27.96.135.75/menu/info/${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response.status === 200 && response.data.itemlist) {
          // menuType에 따라 한글 순서로 정렬
          const sortedMenus = response.data.itemlist.sort((a, b) => {
            if (a.menuType && b.menuType) {
              return a.menuType.localeCompare(b.menuType, 'ko-KR');
            }
            return 0; // 하나 또는 둘 다 menuType이 없을 경우 그대로 둡니다.
          });
          setMenus(sortedMenus);
        }
      } catch (error) {
        console.error('Failed to fetch menu data', error);
      }
    };
    fetchData();
  }, []);

  // 수정하러 가기 버튼을 클릭했을 때 메뉴 데이터를 업데이트하는 함수입니다.
  const handleUpdateClick = async () => {
    try {
      const response = await axios.post(
        'http://27.96.135.75/menu/info/changeMenu',
        { menus },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 200) {
        console.log('Menus updated successfully');
      }
    } catch (error) {
      console.error('Failed to update menus', error);
    }
  };
  const handleInputChange = (event, index, field) => {
    const updatedMenus = [...menus];
    updatedMenus[index][field] = event.target.value;
    setMenus(updatedMenus);
  };
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          margin: 'auto',
          marginTop: '5%',
          border: '1px solid black',
          height: '72vh',
          padding: '3%',
        }}
      >
        {' '}
        <Typography variant="h4" sx={{ marginBottom: '2%' }}>
          메뉴 관리
        </Typography>
        <Grid
          container
          spacing={1}
          justifyContent="center"
          sx={{ marginBottom: '5%' }}
        >
          <Grid item xs={2} sx={{ textAlign: 'center' }}>
            사진
          </Grid>
          <Grid item xs={2} sx={{ textAlign: 'center' }}>
            종류
          </Grid>
          <Grid item xs={2} sx={{ textAlign: 'center' }}>
            이름
          </Grid>
          <Grid item xs={2} sx={{ textAlign: 'center' }}>
            내용
          </Grid>
          <Grid item xs={2} sx={{ textAlign: 'center' }}>
            금액
          </Grid>
          <Grid item xs={1} sx={{ textAlign: 'center' }}>
            품절
          </Grid>
          <Grid item xs={1} sx={{ textAlign: 'center' }}>
            삭제
          </Grid>
        </Grid>
        <Box
          sx={{
            maxHeight: '100%',
            minHeight: '180px',
            overflowY: 'scroll',
            width: '100%',
            height: '100%',
            fontSize:'70%'
          }}
        >
          <Grid container spacing={2} justifyContent="center">
            {menus.map((menu, index) => (
              <React.Fragment key={index}>
                <Grid
                  item
                  xs={12}
                  style={{
                    backgroundColor: outOfStock[index] ? 'lightgray' : 'white', // 품절 상태에 따라 배경색 변경
                  }}
                >
                  <Grid container>
                    <Grid item xs={2} sx={{ textAlign: 'center' }}>
                      {menu.primaryimage ? (
                        <img
                          src={menu.menuImageList[0].url}
                          style={{ width: '50px', height: '100%' }}
                        />
                      ) : (
                        'N/A'
                      )}
                    </Grid>
                    <Grid item xs={2} sx={{ textAlign: 'center' }}>
                    <TextField
                      value={menu.menuType}
                      onChange={(e) => handleInputChange(e, index, 'menuType')}
                      disabled={outOfStock[index]}
                    />
                  </Grid>
                  <Grid item xs={2} sx={{ textAlign: 'center' }}>
                    <TextField
                      value={menu.menuName}
                      onChange={(e) => handleInputChange(e, index, 'menuName')}
                      disabled={outOfStock[index]}
                    />
                  </Grid>
                  <Grid item xs={2} sx={{ textAlign: 'center' }}>
                    <TextField
                      value={menu.menuContent}
                      onChange={(e) => handleInputChange(e, index, 'menuContent')}
                      disabled={outOfStock[index]}
                    />
                  </Grid>
                  <Grid item xs={2} sx={{ textAlign: 'center' }}>
                    <TextField
                      value={menu.price}
                      onChange={(e) => handleInputChange(e, index, 'price')}
                      disabled={outOfStock[index]}
                    />
                  </Grid>
                    <Grid item xs={1} sx={{ textAlign: 'center' }}>
                      <Checkbox
                        checked={outOfStock[index] || false}
                        onChange={(e) => handleStockChange(e, index)}
                      />
                    </Grid>
                    <Grid item xs={1} sx={{ textAlign: 'center' }}>
                      <Button onClick={() => handleDelete(index)}>삭제</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Box>
      </Box>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          sx={{ background: '#21BF73', marginTop: '5%' }}
        >
          수정하러 가기
        </Button>
      </Grid>
    </ThemeProvider>
  );
};

export default SellMyList;
