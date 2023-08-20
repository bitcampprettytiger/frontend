import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Menu/Home/Home';
import SellStoreSet from './Sell/SellStoreSet/SellStroreSet';
import SellHome from './Sell/SellHome/SellHome';
import SellMySet from './Sell/SellMySet/SellMySet'
import SellFooter from './Sell/SellLayout/SellFooter';
import SellHeader from './Sell/SellLayout/SellHeader';
import './Global.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserView } from 'react-device-detect';

const theme = createTheme({
  typography: {
    fontFamily: 'NanumSquareRound, Arial, sans-serif',
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserView className="BV">
          <Router>
            <SellHeader></SellHeader>
            <Routes>
              <Route path="/sellSet" element={<SellStoreSet></SellStoreSet>}></Route>
              <Route path="/sellhome" element={<SellHome></SellHome>}></Route>
              <Route path="/sellmyset" element={<SellMySet></SellMySet>}></Route>
            </Routes>
            <SellFooter></SellFooter>
          </Router>
        </BrowserView>
      </ThemeProvider>
    </>
  );
}

export default App;
