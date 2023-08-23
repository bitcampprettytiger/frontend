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
import SellStoreSet from './Sell/SellStoreSet/SellStroreSet';
import SellHome from './Sell/SellHome/SellHome';
import SellMySet from './Sell/SellMySet/SellMySet';
const menuRoutes = [
  { path: '/home', element: <Home /> },
  { path: '/geolocationcomponent', element: <GeolocationComponent /> },
  { path: '/mypage', element: <Mypage /> },
  { path: '/search', element: <Search /> },
  { path: '/waiting', element: <Waiting /> },
  { path: '/myreview', element: <MyReview /> },
  { path: '/myfavorite', element: <MyFavorite /> },
  { path: '/mytakeout', element: <MyTakeout /> },
  { path: '/waitingDetail', element: <WaitingDetail /> },
  { path: '/myedit', element: <MyEdit /> },
  { path: '/shopHome/:vendorId', element: <ShopMain /> },
];


const authRoutes = [
  { path: '/', element: <AppLogin /> },
  { path: '/signup', element: <AppSignup /> },
  { path: '/selllogin', element: <SellLogin /> },
  { path: '/sellsign1', element: <SellSignUp1 /> },
  { path: '/sellsign2', element: <SellSignUp2 /> },
  { path: '/sellsign3', element: <SellSignUp3 /> },
];
const sellRoutes = [
  { path: '/sellset', element: <SellStoreSet /> },
  { path: '/sellhome', element: <SellHome /> },
  { path: '/sellmyset', element: <SellMySet /> },
];
const mapRoutes = [
  { path: '/trfood', element: <TrFood /> },
  { path: '/stfood', element: <StFood /> },
];

export const browserRoutes = [
  ...authRoutes,
  ...menuRoutes,
  ...mapRoutes,
  ...sellRoutes,
];
