import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { BrowserView, MobileView } from 'react-device-detect';
import { browserRoutes, mobileRoutes } from './AppRoute';
import { NoticeProvider } from './Menu/Home/HomeComponents/NoticeContext';
import { ThemeProvider, createTheme } from '@mui/material';

function App() {

  const muitheme = createTheme({
    palette: {
      primary: {
        main: '#FF745A',
      },
      secondary: {
        main: '#D9D9D9',
      },
    },
  });
  

  return (
    <ThemeProvider theme={muitheme}>
      <NoticeProvider>
        <BrowserView className='BV'>
          <Router>
            <Routes>
              {browserRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Router>
        </BrowserView>
        {/* 
        <MobileView className='MV'>
          <Router>
            <Routes>
              {mobileRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Router>
        </MobileView> */}
      </NoticeProvider>
    </ThemeProvider>
  );
}

export default App;