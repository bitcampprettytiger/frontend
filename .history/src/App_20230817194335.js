import './App.css';
import Header from '../src/Layout/Header';
import Footer from '../src/Layout/Footer';
import StFood from './Menu/StFood';
import Home from './Menu/Home';
import TrFood from './Menu/TrFood';
import Mypage from './Menu/Mypage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';
import LoginRoute from './LoginRoute';
function App() {
  return (
    <>
      <LoginRoute></LoginRoute>
      <BrowserView className="BV">
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/stfood" element={<Stfood></Stfood>}></Route>
            <Route path="/trfood" element={<Trfood></Trfood>}></Route>
            <Route path="/mypage" element={<Mypage></Mypage>}></Route>
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </BrowserView>

      <MobileView className="MV">
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/stfood" element={<Stfood></Stfood>}></Route>
            <Route path="/trfood" element={<Trfood></Trfood>}></Route>
            <Route path="/mypage" element={<Mypage></Mypage>}></Route>
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </MobileView>

    </>
  );
}

export default App;
