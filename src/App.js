import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { BrowserView, MobileView } from 'react-device-detect';
import { ThemeProvider } from 'styled-components';
import { browserRoutes, mobileRoutes } from './AppRoute';

function App() {

  const theme = {
    primaryColor: '#007BFF',
    secondaryColor: '#6C757D',
    successColor: '#28A745',
    warningColor: '#FFC107',
    errorColor: '#DC3545',
    backgroundColor: '#f8f9fa',
    smallFontSize: '12px',
    mediumFontSize: '16px',
    largeFontSize: '24px',
    primaryFont: '"Roboto", sans-serif',
    secondaryFont: '"Arial", sans-serif',
    smallSpacing: '8px',
    mediumSpacing: '16px',
    largeSpacing: '32px',
    mobileBreakpoint: '480px',
    tabletBreakpoint: '768px',
    desktopBreakpoint: '1024px',
    smallBorderRadius: '4px',
    mediumBorderRadius: '8px',
  }



  return (
    <ThemeProvider theme={theme}>
      <>
        <BrowserView className='BV'>
          <Router>
            <Routes>
              {browserRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Router>
        </BrowserView>

        <MobileView className='MV'>
          <Router>
            <Routes>
              {mobileRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Router>
        </MobileView>
      </>
    </ThemeProvider>
  );
}

export default App;