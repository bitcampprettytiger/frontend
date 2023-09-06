import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { AppRoute } from './AppRoute';
import { FavoriteProvider } from './Menu/MyPage/MyPageComponents/FavoriteContext';
import { ReviewContextProvider } from './Menu/MyPage/MyPageComponents/ReviewContext';
function App() {
  return (
    <FavoriteProvider>
      <ReviewContextProvider>
        <AppRoute />
      </ReviewContextProvider>
    </FavoriteProvider>
  );
}

export default App;
