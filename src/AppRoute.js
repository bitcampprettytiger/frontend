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
import AppLogin from './Login,Join/login/Login'
import AppSignup from './Login,Join/join/Register'
import SellerPage from './Seller/SellerPage '
import CustomerPage from './Seller/CustomerPage'
export const browserRoutes = [


    { path: '/', element: <AppLogin /> },
    { path: '/signup', element: <AppSignup /> },
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
    { path: '/shopmain', element: <ShopMain /> },
    { path: '/sellerpage', element: <SellerPage/>},
    { path: '/CustomerPage', element: <CustomerPage />}

];

export const mobileRoutes = [
    { path: '/', element: <Home /> },
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
    { path: '/shopmain', element: <ShopMain /> },
];
