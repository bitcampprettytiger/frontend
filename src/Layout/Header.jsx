import React, { useState, useEffect } from 'react';
import '../App.css';
import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useNavigate } from 'react-router-dom';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import { convertCoordsToAddress } from '../Utils/kakaoUtils';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Notice from '../Menu/Home/HomeComponents/Notice';

function Header({ page, searchInput, handleSearchChange, handleDeleteClick, handleSearchClick, setAddressToHome }) {
    Header.defaultProps = {
        setAddressToHome: () => { }  // 기본 빈 함수 설정
    };


    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);

    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [address, setAddress] = useState("");
    const [error, setError] = useState(null);
    const [showNotificationPanel, setShowNotificationPanel] = useState(false);
    const navigateToNotificationPage = () => {
        navigate('/notice'); // 여기에 알림 페이지의 경로를 입력하세요.
    };
    const handleBackButtonClick = () => {
        navigate('/home'); // Home 페이지로 직접 이동
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };
    const handleMenuClick = () => {
        navigate('/waiting'); // 여기서 '/waiting'은 Waiting.jsx 임시이동
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }, error => {
                console.error("Error getting location:", error);
                setError(error.message);
            });
        } else {
            setError("Geolocation은 이 브라우저에서 지원되지 않습니다.");
        }
    }, []);
    useEffect(() => {
        if (location.latitude && location.longitude) {
            convertCoordsToAddress(location.latitude, location.longitude, (result, status) => {
                // console.error(result)
                console.log(setAddressToHome);

                if (status === window.kakao.maps.services.Status.OK) {
                    setAddress(result[0].address.address_name);
                    console.log(address);
                    setAddressToHome(result[0].address.address_name, location);
                } else {
                    setAddress("주소를 가져오는 중 에러 발생");
                    console.error("Error fetching address from coordinates");
                }

                // setAddressToHome(result[0].address.address_name);
            });
        }
    }, [location]);

    const toggleNotificationPanel = () => {
        setShowNotificationPanel(!showNotificationPanel);
    };
    const clearNotifications = () => {
        setNotifications([]);
    };

    const renderHomeHeader = () => (
        <div className="App-header">
            <div className="Home-header-left-section">
                <MenuIcon className="Home-menu-icon" onClick={handleMenuClick} />
            </div>
            <div className="Home-header-center-section">
                {location && location.latitude && location.longitude
                    ? `${address}`
                    : "위치 정보를 가져오는 중..."}
            </div>
            <div className="Home-header-right-section">
                <div className="notification-container">
                    <NotificationsNoneIcon onClick={navigateToNotificationPage} />
                    {notifications.length > 0 && (
                        <div className="notification-count">
                            {notifications.length}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );





    const renderOtherHeader = (content) => (
        <div className="App-header">
            <div className="header-left-section">
                {/* 다른 페이지의 왼쪽 섹션 내용 */}
            </div>
            <div className="header-center-section">
                {content}
            </div>
            <div className="header-right-section">
                {/* 다른 페이지의 오른쪽 섹션 내용 */}
            </div>
        </div>
    );
    const renderTakeoutHeader = () => (
        <div className="App-header">
            <div className="header-left-section">
                <button onClick={handleBackButtonClick}>
                    <ArrowBackIcon /> {/* 뒤로 가기 아이콘 */}
                </button>
            </div>
            <div className="header-center-section">
                {/* 여기에 현재 위치를 표시하는 로직 */}
                아직 위치 api 안함
            </div>
            <div className="header-right-section">
                <img src="/images/search.png" alt="Search" />
                <img src="/images/cart.png" alt="Cart" />
            </div>
        </div>
    );
    /*검색창 헤더*/
    const renderSearchHeader = () => (
        <div className="App-header">
            <div className="header-left-section">
                <button style={{ border: 'none', background: 'none' }} onClick={handleBackButtonClick}>
                    <ArrowBackIcon style={{ color: 'black' }} />
                </button>
            </div>
            <div className="search-header-center-section">
                <div className="search-container">
                    <button className="search-button" onClick={handleSearchClick}>
                        <img src="/images/inputsearch.png" alt="검색아이콘" />
                    </button>
                    <input
                        className="search-input"
                        type="text"
                        value={searchInput}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                    />
                    <button style={{ border: 'none', background: 'none' }} onClick={handleDeleteClick}>
                        <HighlightOffIcon style={{ color: '#ff813d' }} />
                    </button>
                </div>
            </div>

        </div>
    );
    const renderHotplaceHeader = (content) => (
        <div className="App-header">
            <div className="header-left-section">
                <button className="hotplace-back-button" style={{ border: 'none', background: 'none' }} onClick={handleBackButtonClick}>
                    <ArrowBackIcon style={{ color: 'black' }} />
                </button>
            </div>
            <div className="hotplace-header-center-section">
                {content}
            </div>
            <div className="hotplace-header-right-section"></div>
        </div>
    );
    const renderWaitingHeader = () => (
        <div className="App-header">
            <div className="waiting-header-left-section">
                <button style={{ border: 'none', background: 'none' }} onClick={handleBackButtonClick}>
                    <ArrowBackIcon />
                </button>
            </div>
            <div className="waiting-header-center-section">
                {/* 여기에 원하는 텍스트를 입력할 수 있습니다. */}
                "임시 데이터"
            </div>
            <div className="waiting-header-right-section">
                <button style={{ border: 'none', background: 'none' }}>
                    <FavoriteIcon />
                </button>
                <button style={{ border: 'none', background: 'none' }}>
                    <ShareIcon />
                </button>
            </div>
        </div>
    );
    //줄서기 디테일
    const renderWaitingDetailHeader = () => (
        <div className="App-header">
            <div className="waiting-detail-header-left-section"></div>
            <div className="waiting-detail-header-center-section">줄서기 신청하기</div>
            <div className="waiting-detail-header-right-section">
                <button style={{ border: 'none', background: 'none' }} onClick={handleBackButtonClick}>
                    취소
                </button>
            </div>
        </div>
    );

    const renderMypageHeader = () => (
        <div className="App-header">
            <div className="mypage-header-left-section">
                {/* 다른 페이지의 왼쪽 섹션 내용 */}
            </div>
            <div className="mypage-header-center-section">
                {/* 여기에 원하는 내용을 넣거나 비워둘 수 있습니다. */}
            </div>
            <div className="mypage-header-right-section">
                <button
                    className="mypage-settings-button"
                    onClick={() => navigate('/myedit')}>
                    <SettingsIcon />
                </button>
            </div>
        </div>
    );
    //리뷰 뒤로가기버튼
    const handleGoToMypage = () => {
        navigate('/mypage'); // Mypage.js로 이동하기 위한 경로를 설정합니다. 경로가 다를 경우 적절히 수정해주세요.
    };
    //리뷰 홈버튼  
    const handleGoToHome = () => {
        navigate('/home'); // Home.js로 이동하기 위한 경로를 설정합니다. 경로가 다를 경우 적절히 수정해주세요.
    };
    //리뷰 헤더
    const renderMyReviewHeader = () => (
        <div className="App-header">
            <div className="header-left-section">
                <button
                    style={{ border: 'none', background: 'none' }}
                    onClick={handleGoToMypage}
                >
                    <ArrowBackIcon style={{ color: 'black' }} />
                </button>
            </div>
            <div className="header-center-section">
                나의 먹자취 리뷰
            </div>
            <div className="header-right-section">
                <button
                    style={{ border: 'none', background: 'none' }}
                    onClick={handleGoToHome}
                >
                    <HomeIcon style={{ color: 'black' }} />
                </button>
            </div>
        </div>
    );
    const renderMyFavoriteHeader = () => (
        <div className="App-header">
            <div className="header-left-section">
                <button
                    style={{ border: 'none', background: 'none' }}
                    onClick={handleGoToMypage}
                >
                    <ArrowBackIcon style={{ color: 'black' }} />
                </button>
            </div>
            <div className="header-center-section">
                내가 찜해찜!
            </div>
            <div className="header-right-section">
                <button
                    style={{ border: 'none', background: 'none' }}
                    onClick={handleGoToHome}
                >
                    <HomeIcon style={{ color: 'black' }} />
                </button>
            </div>
        </div>
    );


    const renderMyTakeoutHeader = () => (
        <div className="App-header">
            <div className="header-left-section">
                <button
                    style={{ border: 'none', background: 'none' }}
                    onClick={handleGoToMypage}
                >
                    <ArrowBackIcon style={{ color: 'black' }} />
                </button>
            </div>
            <div className="header-center-section">
                포장주문내역
            </div>
            <div className="header-right-section">
                <button
                    style={{ border: 'none', background: 'none' }}
                    onClick={handleGoToHome}
                >
                    <HomeIcon style={{ color: 'black' }} />
                </button>
            </div>
        </div>
    );
    const renderMyEditHeader = () => (
        <div className="App-header">
            <div className="header-left-section">
                <button
                    style={{ border: 'none', background: 'none' }}
                    onClick={handleGoToMypage}
                >
                    <ArrowBackIcon style={{ color: 'black' }} />
                </button>
            </div>
            <div className="header-center-section">
                회원 정보 설정
            </div>
            <div className="header-right-section">
                <button
                    style={{ border: 'none', background: 'none' }}
                    onClick={handleGoToHome}
                >
                    <HomeIcon style={{ color: 'black' }} />
                </button>
            </div>
        </div>
    );
    const IconButton = ({ onClick, children }) => (
        <button style={{ border: 'none', background: 'none' }} onClick={onClick}>
            {children}
        </button>
    );

    return (
        <div className="header">
            {page === 'home' && renderHomeHeader(setAddressToHome)}
            {page === 'trfood' && renderOtherHeader('Food Truck Header Content')}
            {page === 'pojangmacha' && renderOtherHeader('Pojangmacha Header Content')}
            {page === 'stfood' && renderOtherHeader('Street Food Header Content')}
            {page === 'mypage' && renderMypageHeader()}
            {page === 'takeout' && renderTakeoutHeader()}
            {page === 'search' && renderSearchHeader()}
            {page === 'hotplace' && renderHotplaceHeader("Hotplace Header Content")}
            {page === 'waiting' && renderWaitingHeader()}
            {page === 'waitingDetail' && renderWaitingDetailHeader()}
            {page === 'myreview' && renderMyReviewHeader()}
            {page === 'myfavorite' && renderMyFavoriteHeader()}
            {page === 'mytakeout' && renderMyTakeoutHeader()}
            {page === 'myedit' && renderMyEditHeader()}
        </div>

    );









}

export default Header;