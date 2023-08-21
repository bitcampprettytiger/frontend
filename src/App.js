import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Menu/Home/Home';
import StFood from './Menu/StFood/StFood';
import TrFood from './Menu/TrFood/TrFood';
import Mypage from './Menu/MyPage/Mypage';
import './App.css';
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
import { BrowserView, MobileView } from 'react-device-detect';
import LoginRoute from '../src/Login,Join/LoginRoute'
import ShopMain from './ShopDetails/ShopMain'
import { ThemeProvider } from 'styled-components';
import SellHeader from './Sell/SellLayout/SellHeader';
import SellStoreSet from './Sell/SellStoreSet/SellStroreSet';
import SellHome from './Sell/SellHome/SellHome';
import SellMySet from './Sell/SellMySet/SellMySet';
import SellFooter from './Sell/SellLayout/SellFooter';
import Notice from './Menu/Home/HomeComponents/Notice';
import { NoticeProvider } from './Menu/Home/HomeComponents/NoticeContext';




function App() {


  return (
    <NoticeProvider>
      <Router>
        <BrowserView className='BV'>

          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/trfood" element={<TrFood />} />
            <Route path="/stfood" element={<StFood />} />
            <Route path="/geolocationcomponent" element={<GeolocationComponent />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/waiting" element={<Waiting />} />
            <Route path="/myreview" element={<MyReview />} />
            <Route path="/myfavorite" element={<MyFavorite />} />
            <Route path="/mytakeout" element={<MyTakeout />} />
            <Route path="/waitingDetail" element={<WaitingDetail />} />
            <Route path="/myedit" element={<MyEdit />} />
            <Route path="/notice" element={<Notice />} />


            <Route path="/shophome" element={<ShopMain />} />
            <Route path="/sellSet" element={<SellStoreSet />} />
            <Route path="/sellhome" element={<SellHome />} />
            <Route path="/sellmyset" element={<SellMySet />} />
          </Routes>

        </BrowserView>

        <MobileView className='MV'>
          <div className="App wrapper">
            <div className="App-main">
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/trfood" element={<TrFood />} />
                <Route path="/stfood" element={<StFood />} />
                <Route path="/geolocationcomponent" element={<GeolocationComponent />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/search" element={<Search />} />
                <Route path="/waiting" element={<Waiting />} />
                <Route path="/myreview" element={<MyReview />} />
                <Route path="/myfavorite" element={<MyFavorite />} />
                <Route path="/mytakeout" element={<MyTakeout />} />
                <Route path="/waitingDetail" element={<WaitingDetail />} />
                <Route path="/notice" element={<Notice />} />

                <Route path="/myedit" element={<MyEdit />} />

                <Route path="/shophome" element={<ShopMain />} />
                <Route path="/sellSet" element={<SellStoreSet />} />
                <Route path="/sellhome" element={<SellHome />} />
                <Route path="/sellmyset" element={<SellMySet />} />
              </Routes>
            </div>
          </div>
        </MobileView>
      </Router>
    </NoticeProvider>
  );
}

export default App;
