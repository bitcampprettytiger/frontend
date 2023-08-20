import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Content from './components/Content';
import Home from './Menu/Home/Home';
import StFood from './Menu/StFood/StFood';
import Home from './Menu/Home/Home';
import TrFood from './Menu/TrFood/TrFood';
import Mypage from './Menu/MyPage/Mypage';
import './App.css';
// import Header from './Layout/Header.jsx';
// import Footer from './Layout/Footer.jsx';
import Search from './Menu/Home/HomeComponents/Search';
import Hotplace from './Menu/Home/HomeComponents/Hotplace';
import MachaSection from './Menu/Home/HomeComponents/MachaSection';
import Waiting from './Menu/Home/HomeComponents/Waiting';
import WaitingDetail from './Menu/Home/HomeComponents/WaitingDetail';
import MyReview from './Menu/MyPage/MyPageComponents/MyReview';
import MyFavorite from './Menu/MyPage/MyPageComponents/MyFavorite';
import MyTakeout from './Menu/MyPage/MyPageComponents/MyTakeout';
import GeolocationComponent from './Menu/Home/HomeComponents/GeolocationComponent';
import MyEdit from './Menu/MyPage/MyPageComponents/MyEdit';
import { BrowserView, MobileOnlyView, MobileView } from 'react-device-detect';
import LoginRoute from '../src/Login,Join/LoginRoute';
import ShopMain from './ShopDetails/ShopMain';
import SellFooter from './Sell/SellLayout/SellFooter';
import SellHeader from './Sell/SellLayout/SellHeader';
import SellStoreSet from './Sell/SellStoreSet/SellStroreSet';
import SellHome from './Sell/SellHome/SellHome';
import SellMySet from './Sell/SellMySet/SellMySet'
import './Global.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'NanumSquareRound, Arial, sans-serif',
  },
});

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';
import LoginRoute from '../src/Login,Join/LoginRoute'
import ShopMain from './ShopDetails/ShopMain'
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserView className="BV">
          <Router>
            <SellHeader></SellHeader>
            <Routes>
              <Route
                path="/sellSet"
                element={<SellStoreSet></SellStoreSet>}
              ></Route>
              <Route
                path="/sellhome"
                element={<SellHome></SellHome>}
              ></Route>
              <Route
                path="/sellmyset"
                element={<SellMySet></SellMySet>}
              ></Route>
            </Routes>
            <SellFooter></SellFooter>

          </Router>
        </BrowserView>
      </ThemeProvider>

      {/* <BrowserView className='BV'>

        <Router>

          <Routes>
            <Route path="/home" element={<Home></Home>}></Route>
            <Route path="/stfood" element={<StFood></StFood>}></Route>
            <Route path="/trfood" element={<TrFood></TrFood>}></Route>
            <Route path="/mypage" element={<Mypage></Mypage>}></Route>
            <Route path='/shophome' element={<ShopMain/>}></Route>
          </Routes>

        </BrowserRouter>
      </BrowserView>

      <MobileView className="MV">
        <BrowserRouter>

          <Routes>
            <Route path="/home" element={<Home></Home>}></Route>
            <Route path="/stfood" element={<StFood></StFood>}></Route>
            <Route path="/trfood" element={<TrFood></TrFood>}></Route>
            <Route path="/mypage" element={<Mypage></Mypage>}></Route>
            <Route path='/shophome' element={<ShopMain/>}></Route>
          </Routes>

            </div>


    </>
  );
}

export default App;
