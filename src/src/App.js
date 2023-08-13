import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // <-- 추가된 부분
// import Content from './components/Content'; // <-- 경로 확인
import Home from './Menu/Home';
import StFood from './Menu/StFood';
import TrFood from './Menu/TrFood';
import Mypage from './Menu/Mypage';
import './App.css';
import Header from './Layout/Header';
import Search from './Menu/Search';
import Hotplace from './Menu/Hotplace';
import MachaSection from './Menu/MachaSection'; // 

import { BrowserView, MobileView } from 'react-device-detect'
import Footer from './Layout/Footer';


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
            <Footer />
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
                <Route path="/search" element={<Search />} /> {/* Search 페이지에 대한 라우트 추가 */}
                <Route path="/hotplace" element={<Hotplace />} />
                <Route path="/hotplace/:placeId" element={<Hotplace />} />


              </Routes>
              {/* </Content> */}

            </div>

            <Footer />
          </div>
        </Router>
      </MobileView>
    </>
  );
}

export default App; // <-- 이 부분도 확인
