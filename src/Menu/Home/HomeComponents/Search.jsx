import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../Layout/Header';
import Footer from '../../../Layout/Footer';
import './Search.css';
import { useSearch } from '../SearchCustomHooks/useSearch';



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
    const handleShopClick = (shopId) => {
        navigate(`/ShopMain/${shopId}`);
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
    const handleRecentSearchClick = (text) => {
        setSearchInput(text);
        handleSearchClick();
    };
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
                                        <button key={index} onClick={() => handleRecentSearchClick(item.text)}>{item.text}</button>
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
                                            <img src={shop.imgSrc} alt={shop.name} style={{ borderRadius: '50%' }} />
                                            {shop.name}
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
                            <img src={result.imgSrc ? result.imgSrc : "/images/roopy.png"} alt={result.name} />
                            <div className="result-info">
                                <p className="shop-name">{result.name}</p>
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
