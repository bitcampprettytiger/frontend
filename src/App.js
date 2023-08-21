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
import { Sell } from '@mui/icons-material';
import SellJoin from './Sell/Join/SellJoin';
import SellSignUp from './Sell/SignUp/SellSiginUp';
import SellSignUp2 from './Sell/SignUp/SellSignUp2';
import SellSignUp3 from './Sell/SignUp/SellSignUp3';
import SellSignUp4 from './Sell/SignUp/SellSignUp4';
import { ThemeProvider } from 'styled-components';
import SellHeader from './Sell/SellLayout/SellHeader';
import SellStoreSet from './Sell/SellStoreSet/SellStroreSet';
import SellHome from './Sell/SellHome/SellHome';
import SellMySet from './Sell/SellMySet/SellMySet';
import SellFooter from './Sell/SellLayout/SellFooter';



function App() {

  const data = [
    {
      title: "포장마차거리 핫플레이스 BEST",
      description: "지금은 야장이 가장 인기! 먹고가꼬에서 포장마차거리를 확인하세요!",
      imageList: ["/images/place1.png", "/images/place2.png", "/images/place3.png", "/images/place4.png", "/images/place5.png"]
    },
    {
      title: "여기 갔다왔어요~ 리뷰를 참고해보는건 어때요?",
      description: "먹꼬가꼬의 유저들이 남긴 생생한 후기! 이 가게는 어때요?",
      imageList: ["/images/place5.png", "/images/place5.png", "/images/place3.png", "/images/place4.png", "/images/place2.png"]
    },
    {
      title: "이번달 가장 많이 찾은 장소! 놓칠 수 없지!",
      description: "유행에 뒤쳐질순 없자나~",
      imageList: ["/images/place3.png", "/images/place1.png", "/images/place4.png", "/images/place2.png", "/images/place5.png"]
    }
  ];
  return (

    <Router>
      <BrowserView className='BV'>

          <Routes>

            <Route path="/home" element={<Home />} />
            <Route path="/trfood" element={<TrFood />} />
            <Route path="/stfood" element={<StFood />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/waiting" element={<Waiting />} />
            <Route path="/myreview" element={<MyReview />} />
            <Route path="/myfavorite" element={<MyFavorite />} />
            <Route path="/mytakeout" element={<MyTakeout />} />
            <Route path="/waitingDetail" element={<WaitingDetail />} />
            <Route path="/myedit" element={<MyEdit />} />
            <Route path="/hotplace" element={
              <div>
                <Hotplace />
                {data.map((section, index) => (
                  <MachaSection key={index} {...section} />
                ))}
              </div>
            } />


            <Route path="/home" element={<Home></Home>}></Route>
            <Route path="/stfood" element={<StFood></StFood>}></Route>
            <Route path="/trfood" element={<TrFood></TrFood>}></Route>
            <Route path="/mypage" element={<Mypage></Mypage>}></Route>
            <Route path='/shophome' element={<ShopMain />}></Route>
            <Route path='/selljoin' element={<SellJoin></SellJoin>}></Route>
            <Route path='/SellSignUp' element={<SellSignUp></SellSignUp>}></Route>
            <Route path='/SellSignUp2' element={<SellSignUp2></SellSignUp2>}></Route>
            <Route path='/SellSignUp3' element={<SellSignUp3></SellSignUp3>}></Route>
            <Route path='/SellSignUp4' element={<SellSignUp4></SellSignUp4>}></Route>

          </Routes>


      </BrowserView >




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
              <Route path="/myedit" element={<MyEdit />} />
              <Route path="/hotplace" element={
                <div>
                  <Hotplace />
                  {data.map((section, index) => (
                    <MachaSection key={index} {...section} />
                  ))}
                </div>
              } />
            </Routes>
            <Route path="/shophome" element={<ShopMain />} />
            <Route path="/sellSet" element={<SellStoreSet />} />
            <Route path="/sellhome" element={<SellHome />} />
            <Route path="/sellmyset" element={<SellMySet />} />
          </div>
        </div>
      </MobileView>
    </Router>

  );
}

export default App;
