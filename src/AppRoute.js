// routes.js
import Home from './Menu/Home/Home';
import StFood from './Menu/StFood/StFood';
import TrFood from './Menu/TrFood/TrFood';
import Mypage from './Menu/MyPage/Mypage';
import Search from './Menu/Home/HomeComponents/Search';
import Waiting from './Menu/Home/HomeComponents/Waiting';
import WaitingDetail from './Menu/Home/HomeComponents/WaitingDetail';
import MyReview from './Menu/MyPage/MyPageComponents/MyReview';
import MyFavorite from './Menu/MyPage/MyPageComponents/MyFavorite';
import MyTakeout from './Menu/MyPage/MyPageComponents/MyTakeout';
import GeolocationComponent from './Menu/Home/HomeComponents/GeolocationComponent';
import MyEdit from './Menu/MyPage/MyPageComponents/MyEdit';
import ShopMain from './ShopDetails/ShopMain';
import ReviewForm from './ShopDetails/Review/ReviewForm';
import MyTakeoutDetail from './Menu/MyPage/MyPageComponents/MyTakeoutDetail';
import AppLogin from './Login,Join/login/Login';
import AppSignup from './Login,Join/join/Register';
import SellSignUp3 from './Sell/SellSignUp/SSUComponents/SellSignUp3';
import SellSignUp2 from './Sell/SellSignUp/SSUComponents/SellSignUp2';
import SellSignUp1 from './Sell/SellSignUp/SSUComponents/SellSignUp1';
import SellLogin from './Sell/SellJoin/SellLogin';

const commonRoutes = [
    { path: '/home', element: <Home /> },
    { path: '/trfood', element: <TrFood /> },
    { path: '/stfood', element: <StFood /> },
    { path: '/geolocationcomponent', element: <GeolocationComponent /> },
    { path: '/mypage', element: <Mypage /> },
    { path: '/search', element: <Search /> },
    { path: '/waiting', element: <Waiting /> },
    { path: '/myreview', element: <MyReview /> },
    { path: '/myfavorite', element: <MyFavorite /> },
    { path: '/mytakeout', element: <MyTakeout /> },
    { path: '/waitingDetail', element: <WaitingDetail /> },
    { path: '/myedit', element: <MyEdit /> },
    { path: '/shopHome/vendor:Id', element: <ShopMain /> },
    // 기타 공통 라우트
  ];
  
  export const browserRoutes = [
    { path: '/', element: <AppLogin /> },
    { path: '/signup', element: <AppSignup /> },
    { path: '/sellsign1', element: <SellSignUp1 /> },
    { path: '/sellsign2', element: <SellSignUp2 /> },
    { path: '/sellsign3', element: <SellSignUp3 /> },
    { path: '/selllogin', element: <SellLogin /> },
    ...commonRoutes, // 공통 라우트 추가
  ];
  
  export const mobileRoutes = [
    { path: '/', element: <Home /> },
    { path: '/mytakeoutdetail', element: <MyTakeoutDetail /> },
    { path: '/reviewform', element: <ReviewForm /> },
    ...commonRoutes, // 공통 라우트 추가
  ];
  