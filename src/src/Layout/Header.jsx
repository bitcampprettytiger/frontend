import React from 'react';
import '../App.css';
import './Header.css';
import MenuIcon from '@mui/icons-material/Menu'; // Material-UI 아이콘을 임포트합니다.
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // 뒤로 가기 아이콘 임포트
import SearchIcon from '@mui/icons-material/Search'; // 검색 아이콘 임포트
import HighlightOffIcon from '@mui/icons-material/HighlightOff';// 삭제 아이콘 임포트
import { useNavigate } from 'react-router-dom'; // 이동 기능을 위해 사용


function Header({ page, searchInput, handleSearchChange, handleDeleteClick, handleSearchClick }) {
    const navigate = useNavigate(); // react-router의 navigate 함수를 사용
    const handleBackButtonClick = () => {
        navigate('/'); // Home 페이지로 직접 이동
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    const renderHomeHeader = () => (
        <div className="App-header">
            <div className="Home-header-left-section">
                <MenuIcon className="Home-menu-icon" /> {/* 빨간색 메뉴 아이콘을 사용합니다. */}
            </div>
            <div className="Home-header-center-section">
                {/* 현재 위치를 표시하는 API를 사용하면 됩니다. */}
                아직 위치 api 안함
            </div>
            <div className="Home-header-right-section">
                <button className="Home-login-signup-button">로그인/가입</button> {/* 버튼의 크기를 변경하기 위해 클래스를 추가합니다. */}
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
            <div className="header-center-section">
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
            <div className="header-right-section"></div>
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





    return (
        <div className="header">
            {page === 'home' && renderHomeHeader()}
            {page === 'trfood' && renderOtherHeader('Food Truck Header Content')}
            {page === 'pojangmacha' && renderOtherHeader('Pojangmacha Header Content')}
            {page === 'stfood' && renderOtherHeader('Street Food Header Content')}
            {page === 'mypage' && renderOtherHeader('MyPage Header Content')}
            {page === 'takeout' && renderTakeoutHeader()}
            {page === 'search' && renderSearchHeader()}
            {page === 'hotplace' && renderHotplaceHeader("Hotplace Header Content")}



        </div>

    );
}

export default Header;
