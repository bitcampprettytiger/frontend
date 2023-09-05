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
import Notice from './Menu/Home/HomeComponents/Notice';
import GeolocationComponent from './Menu/GeolocationCustomHooks/GeolocationComponent';
import MyEdit from './Menu/MyPage/MyPageComponents/MyEdit';
import ShopMain from './ShopDetails/ShopMain';
import ReviewForm from './ShopDetails/Containers/Review/ReviewComponents/ReviewForm';
import AppLogin from './Login,Join/login/Login';
import AppSignup from './Login,Join/join/Register';
import SellSignUp3 from './Sell/SellSignUp/SSUComponents/SellSignUp3';
import SellSignUp2 from './Sell/SellSignUp/SSUComponents/SellSignUp2';
import SellSignUp1 from './Sell/SellSignUp/SSUComponents/SellSignUp1';
import SellLogin from './Sell/SellJoin/SellLogin';
import SellStoreSet from './Sell/SellStoreSet/SellStroreSet';
import SellHome from './Sell/SellHome/SellHome';
import SellMySet from './Sell/SellMySet/SellMySet';
import CartPage from './ShopDetails/Containers/Menu/MenuComponents/Cart';
import { FavoriteProvider } from './Menu/MyPage/MyPageComponents/FavoriteContext';
import { useLocation } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NoticeProvider } from './Menu/Home/HomeComponents/NoticeContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import NotFound from './NotFound';
import SellerPage from './Seller/SellerPage ';
import Tackout from './Seller/Tackout';
import CustomerPage from './Seller/CustomerPage';
import AnimatedCursor from './Layout/AnimatedCursor';
import ReviewDetail from './ShopDetails/Containers/Review/ReviewComponents/ReviewDetail';
import MyTakeoutDetail from './Menu/MyPage/MyPageComponents/MyTakeoutDetail';
import Seller from './WebSocket/Seller';
import Buyer from './WebSocket/Buyer';
import SellList from './Sell/SellStoreSet/SellList';




const muitheme = createTheme({
  palette: {
    primary: {
      main: '#21BF73',
    },
    secondary: {
      main: '##FD5E53',
    },
  },
});

const menuRoutes = [
  { path: '/home', element: <Home /> },
  { path: '/geolocationcomponent', element: <GeolocationComponent /> },
  { path: '/search', element: <Search /> },
  { path: '/waiting', element: <Waiting /> },
  { path: '/myreview', element: <FavoriteProvider><MyReview /> </FavoriteProvider> },
  { path: '/waitingDetail', element: <WaitingDetail /> },
  { path: '/shopHome/:vendorId', element: <ShopMain /> },
  { path: '/reviewform/:orderId/:vendorId', element: <ReviewForm /> },
  { path: '/review-detail/:vendorId', element: <ReviewDetail /> },
  { path: '/notice', element: <Notice /> },
  { path: '/mypage', element: <FavoriteProvider><Mypage /></FavoriteProvider> },
  { path: '/myfavorite', element: <FavoriteProvider><MyFavorite /></FavoriteProvider> },
  { path: '/mytakeout', element: <MyTakeout /> },
  { path: '/mytakeoutdetail/order/:orderId', element: <MyTakeoutDetail /> },
  { path: '/myedit', element: <MyEdit /> },
  { path: '/cart', element: <CartPage /> },
  { path: '/buyer', element: <Buyer /> },
  { path: '/seller', element: <Seller /> },
  { path: '*', element: <NotFound /> },


];

const authRoutes = [
  { path: '/', element: <AppLogin /> },
  { path: '/signup', element: <AppSignup /> },
];

const sellAuthRoutes = [
  { path: '/selllogin', element: <SellLogin /> },
  { path: '/sellPage', element: <SellerPage /> },
  { path: '/sellTake', element: <Tackout /> },
  { path: '/sellcustom', element: <CustomerPage /> },
  { path: '/sellsign1', element: <SellSignUp1 /> },
  { path: '/sellsign2', element: <SellSignUp2 /> },
  { path: '/sellsign3', element: <SellSignUp3 /> },
];

const sellRoutes = [
  { path: '/sellset/:vendorId', element: <SellStoreSet /> },
  { path: '/sellhome/', element: <SellHome /> },
  { path: '/sellmyset/:vendorId', element: <SellList /> },
];
const mapRoutes = [
  { path: '/trfood', element: <TrFood /> },
  { path: '/stfood', element: <StFood /> },
];

export const browserRoutes = [

  ...authRoutes,
  ...menuRoutes,
  ...mapRoutes,

  ...sellAuthRoutes,
  ...sellRoutes,

];

export function AppRoute() {

  return (
    <Router>
      <InnerAppRoute />
    </Router>
  );
}



function InnerAppRoute() {
  const location = useLocation();

  const isSellerRoute = [...sellRoutes, ...sellAuthRoutes].some(route => location.pathname.startsWith(route.path));
  const isUserRoute = [...authRoutes, ...menuRoutes, ...mapRoutes].some(route => location.pathname.startsWith(route.path));

  let className = 'App';

  if (isSellerRoute) {
    className = 'sellerPage';
  } else if (isUserRoute) {
    className = 'userPage';
  }

  return (
    <div className={className}>
      <ThemeProvider theme={muitheme}>
        <NoticeProvider>
          <BrowserView className='BV'>
            <AnimatedCursor />
            <Routes>
              {browserRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
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
    </div>
  );
}