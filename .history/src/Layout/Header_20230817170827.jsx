import React from 'react';
import './Header.css';

function Header() {
  

    return (
        <header className="App-header">
            <img className="App-header-logo" src="/images/logo.png" alt="헤더로고" />
            <div className="header-right-section">
                <button className="header-button2" >
                    <img src="/images/bell.png" alt="알림아이콘" />
                </button>
            </div>
        </header>
    );
}

export default Header;