import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Content from './components/Content'; 
import Home from './Menu/Home/Home';
import StFood from './Menu/StFood/StFood';
import TrFood from './Menu/TrFood/TrFood';
import Mypage from './Menu/MyPage/Mypage';
import './App.css';
import Header from '../../../Layout/Header.jsx';
import Footer from '../../../Layout/Footer.jsx';
import Search from './Menu/Home/HomeComponents/Search';
import Hotplace from './Menu/Home/HomeComponents/Hotplace';
import MachaSection from './Menu/Home/HomeComponents/MachaSection';
import Waiting from './Menu/Home/HomeComponents/Waiting';
import WaitingDetail from './Menu/Home/HomeComponents/WaitingDetail';
import { BrowserView, MobileView } from 'react-device-detect'
import MyReview from './Menu/Home/MyPageComponents/MyReview';
import MyFavorite from './Menu/Home/MyPageComponents/MyFavorite';
import MyTakeout from './Menu/Home/MyPageComponents/MyTakeout';
import MyEdit from './Menu/Home/MyPageComponents/MyEdit';


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
    <>
      <BrowserView className='BV'>
        <Router>
          <div className="App wrapper">

            <div className="App-main">
              <Routes>
                <Route path="/" element={<Home />} />
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
              </Routes>
            </div>

          </div>
        </Router>
      </BrowserView>

      <MobileView className='MV'>
        <Router>

          <div className="App wrapper">

            <div className="App-main">

              {/* <Content> */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/trfood" element={<TrFood />} />
                <Route path="/stfood" element={<StFood />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/search" element={<Search />} />
                <Route path="/hotplace" element={<Hotplace />} />
                <Route path="/hotplace/:placeId" element={<Hotplace />} />
                <Route path="/waiting" exact component={<Waiting />} />
                <Route path="/waitingDetail" element={<WaitingDetail />} />
                <Route path="/myreview" element={<MyReview />} />
                <Route path="/myfavorite" element={<MyFavorite />} />
                <Route path="/mytakeout" element={<MyTakeout />} />
                <Route path="/myedit" element={<MyEdit />} />


              </Routes>
              {/* </Content> */}

            </div>


          </div>
        </Router>
      </MobileView>
    </>
  );
}

export default App; 
