import './App.css';
import Header from '../src/Layout/Header';
import Footer from '../src/Layout/Footer';
import StFood from './Menu/StFood/StFood';
import Home from './Menu/Home/Home';
import TrFood from './Menu/TrFood/TrFood';
import Mypage from './Menu/MyPage/Mypage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';
import LoginRoute from '../src/Login,Join/LoginRoute'
import ShopMain from './ShopDetails/ShopMain'
function App() {
  return (
    <>
      <LoginRoute></LoginRoute>
      <BrowserView className="BV">
        <BrowserRouter>

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

        </BrowserRouter>
      </MobileView>

    </>
  );
}

export default App;
