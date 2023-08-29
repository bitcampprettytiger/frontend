import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../Layout/Header';
import Footer from '../../../Layout/Footer';
import './Search.css';
import { useSearch } from '../SearchCustomHooks/useSearch';
import { useGeolocation } from '../../GeolocationCustomHooks/useGeolocation';


const Search = () => {
    const navigate = useNavigate();
    const {
        searchInput,
        setSearchInput,
        searchResults,
        setSearchResults,
        recentSearches,
        setRecentSearches,
        recentShops,
        setRecentShops,
        handleSearchClick,
    } = useSearch('');

    // 가게를 클릭했을 때 동작하는 함수
    const handleShopClick = (vendorId) => {
        navigate(`/ShopMain/${vendorId}`);
        // 이 부분은 커스텀 훅에서도 처리할 수 있습니다.
    };
    const handleDeleteClick = () => {
        setSearchInput("");  // 검색창의 내용을 지움
    };


    // 검색 입력값이 변경될 때 동작하는 함수
    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    // 엔터키를 눌렀을 때 검색을 실행하는 함수
    const handleKeyUp = (e) => {
        if (e.key === "Enter") {
            handleSearchClick();
        }
    };

    // 최근 검색어를 클릭했을 때 동작하는 함수
    const handleRecenthandleSearchClick = (text) => {
        setSearchInput(text);
        handleSearchClick();
    };
    useEffect(() => {
        // 로컬 스토리지에서 최근 검색어 가져오기
        const storedRecentSearches = localStorage.getItem('recentSearches');
        if (storedRecentSearches) {
            setRecentSearches(JSON.parse(storedRecentSearches));
        }
    }, []);


    return (
        <div>
            <Header
                page="search"
                searchInput={searchInput}
                handleSearchChange={handleSearchChange}
                handleSearchClick={handleSearchClick}
                handleDeleteClick={handleDeleteClick}
                handleKeyUp={handleKeyUp}
            />
            <div className="App-main2">
                {/* 최근 검색어와 최근 확인한 가게는 검색어가 없거나 검색 결과가 없을 때만 보입니다. */}

                {(!searchInput || searchResults.length === 0) && (
                    <>
                        <div>
                            <h3>최근 검색어</h3>
                            <div className="hashtag-container">
                                <div className="hashtag-buttons">
                                    {recentSearches.map((item, index) => (
                                        <button key={index} onClick={() => handleRecenthandleSearchClick(item.text)}>{item.text}</button>
                                    ))}

                                </div>
                            </div>
                        </div>
                        <div>
                            <h3>최근 확인한 가게</h3>
                            <div className="hashtag-container">
                                <div className="hashtag-buttons">
                                    {recentShops.map((shop, index) => (
                                        <button key={index} onClick={() => handleShopClick(shop)}>
                                            <img src={shop.imgSrc} alt={shop.vendorName} style={{ borderRadius: '50%' }} />
                                            {shop.vendorName}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <div className="results-container">
                    {searchResults.map(result => (
                        <div key={result.id} className="result-item"
                            onClick={() => handleShopClick(result.id)} // 클릭 이벤트를 추가
                        >
                            <img src={result.imgSrc ? result.imgSrc : "/images/roopy.png"} alt={result.vendorName} />
                            <div className="result-info">
                                <p className="shop-name">{result.vendorName}</p>
                                <div className="rating">
                                    <img className="star-image" src="https://example.com/star.png" alt="star" />
                                    {result.rating}
                                </div>
                                <p>{result.category} / {result.address}</p>
                            </div>
                            <div className="favorite-container">
                                {/* Favorite icon here */}
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <Footer type="search" />
        </div>
    );

};


export default Search;
