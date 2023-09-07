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
import SellMySet from './Sell/SellMySet';
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
import SellMyinfo from './Sell/SellMyinfoList';
import LoginSelectionPage from './Login,Join/TwoLogin';
import { ReviewContextProvider } from './Menu/MyPage/MyPageComponents/ReviewContext';
import PopularStation from './Menu/Home/HomeComponents/PopularStation';
import MemoizedVendorReview from './Sell/SellMyinfo/VendorReview';
import { el } from 'date-fns/locale';
import KaKao from './Login,Join/login-component/snsLogin/KaKaoLogin';
import KaKaoLogin from './Login,Join/login-component/snsLogin/KaKaoLogin';

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
  {
    path: '/myreview',
    element: <MyReview />,
  },
  { path: '/waitingDetail', element: <WaitingDetail /> },
  { path: '/shopHome/:vendorId', element: <ShopMain /> },
  { path: '/reviewform/:orderId/:vendorId', element: <ReviewForm /> },
  { path: '/review-detail/:vendorId', element: <ReviewDetail /> },
  { path: '/notice', element: <Notice /> },
  { path: '/popularstation/:region', element: <PopularStation /> },
  // { path: '/popularstation', element: <PopularStation /> },
  {
    path: '/mypage',
    element: <Mypage />,
  },
  {
    path: '/myfavorite',
    element: <MyFavorite />,
  },
  { path: '/mytakeout', element: <MyTakeout /> },
  { path: '/mytakeoutdetail/order/:orderId', element: <MyTakeoutDetail /> },
  { path: '/myedit', element: <MyEdit /> },
  { path: '/cart', element: <CartPage /> },
  { path: '/buyer', element: <Buyer /> },
  { path: '/seller', element: <Seller /> },
];

const authRoutes = [
  { path: '/login', element: <AppLogin /> },
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
  { path: '/sellmyset/:vendorId', element: <SellList /> },
  { path: '/sellset/:vendorId', element: <SellStoreSet /> },
  { path: '/sellhome/', element: <SellHome /> },
  { path: '/sellinfo/:vendorId', element: <SellMyinfo /> },
  {
    path: '/vendorreview/:vendorId',
    element: <MemoizedVendorReview />,
  },
];
const mapRoutes = [
  { path: '/trfood', element: <TrFood /> },
  { path: '/stfood', element: <StFood /> },
];

const snsLogin = [{ path: '/auth', element: <KaKaoLogin></KaKaoLogin> }];

export const browserRoutes = [
  ...authRoutes,
  ...menuRoutes,
  ...mapRoutes,
  ...snsLogin,
  ...sellAuthRoutes,
  ...sellRoutes,
];
export const mobileRoutes = [
  ...authRoutes,
  ...menuRoutes,
  ...mapRoutes,

  ...sellAuthRoutes,
  ...sellRoutes,
];

export function AppRoute() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSelectionPage />} />
      </Routes>
      <InnerAppRoute />
    </Router>
  );
}

function InnerAppRoute() {
  const location = useLocation();

  if (location.pathname === '/') {
    return null;
    //NotFound 예외처리
  }

  const isSellerRoute = [...sellRoutes, ...sellAuthRoutes].some((route) => {
    console.log(route);
    return location.pathname.startsWith(route.path);
  });
  const isUserRoute = [...authRoutes, ...menuRoutes, ...mapRoutes].some(
    (route) => {
      console.log(route);
      return location.pathname.startsWith(route.path);
    }
  );

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
          <BrowserView className="BV">
            <AnimatedCursor />
            <Routes>
              {browserRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
              {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
          </BrowserView>   
        {/* <MobileView className='MV'>
            <Routes>
              {mobileRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
               <Route path="*" element={<NotFound />} />
            </Routes>
        </MobileView> */}
        </NoticeProvider>
      </ThemeProvider>
    </div>
  );
}
