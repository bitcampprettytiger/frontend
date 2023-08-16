import './App.css';
import Header from '../src/Layout/Header';
import Footer from '../src/Layout/Footer';
import Stfood from '../src/Menu/StFood';
import Home from '../src/Menu/Home';
import Trfood from '../src/Menu/TrFood';
import Mypage from '../src/Menu/Mypage';
import ShopMain from './ShopDetail/ShopMain';
import CartPage from './ShopDetail/component/PackagingOrder/Cart';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';

function App() {
  return (
    <>
      <BrowserView className="BV">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/stfood" element={<Stfood></Stfood>}></Route>
            <Route path="/trfood" element={<Trfood></Trfood>}></Route>
            <Route path="/mypage" element={<Mypage></Mypage>}></Route>
            <Route path='/shophome' element={<ShopMain></ShopMain>}></Route>
            <Route path='/cart' element={<CartPage/>}></Route>
          </Routes>
        </BrowserRouter>
      </BrowserView>

      <MobileView className="MV">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/stfood" element={<Stfood></Stfood>}></Route>
            <Route path="/trfood" element={<Trfood></Trfood>}></Route>
            <Route path="/mypage" element={<Mypage></Mypage>}></Route>
            <Route path='/shophome' element={<ShopMain></ShopMain>}></Route>
            <Route path='/cart' element={<CartPage/>}></Route>
          </Routes>
        </BrowserRouter>
      </MobileView>
    </>
  );
}

export default App;
