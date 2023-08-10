import './App.css';
import Header from '../src/Layout/Header';
import Footer from '../src/Layout/Footer';
import Stfood from '../src/Menu/StFood';
import Home from '../src/Menu/Home';
import Trfood from '../src/Menu/TrFood';
import Mypage from '../src/Menu/Mypage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
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
    </>
  );
}

export default App;
