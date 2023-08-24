import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../../../Layout/Header.jsx';
import Footer from '../../../Layout/Footer.jsx';
import './Search.css';
import { Star as StarIcon } from '@mui/icons-material';
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';
import { yellow } from '@mui/material/colors';
import axios from 'axios';
import useAddress from '../SearchCustomHooks/useAddress.jsx';
import useSearch from '../SearchCustomHooks/useSearch.jsx';

function Search() {


    const API_URL = "http://27.96.135.75/vendor/category";
    const { address, location, setAddressToHome } = useAddress();
    const [shops, setShops] = useState([]);
    const [favorites, setFavorites] = useState(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
        return Array.isArray(storedFavorites) ? storedFavorites : [];
    });

    const {
        searchResults,
        searchInput,
        hasSearched,
        handleSearchChange,
        handleDeleteClick,
        handleHashTagClick,
        handleSearchClick
    } = useSearch(shops); // shops를 직접 전달

    useEffect(() => {
        console.log(searchInput);

        axios.get(`http://27.96.135.75/vendor/category?address=${searchInput}&menuName=${searchInput}&vendorName=${searchInput}`)
            .then(response => {
                console.log(response);
                setShops(response.data.itemlist); // response 자체를 저장하는 대신 response.data를 저장해야 합니다.
            })
            .catch(error => {
                console.error("데이터를 불러오는 데 실패했습니다.", error);
            });
    }, [searchInput]);  // searchInput 추가


    const handleKeyUp = (e) => {
        if (e.keyCode === 46 && !searchInput) { // keyCode 46은 Delete 키에 해당합니다.
            // 원하는 액션을 여기에 수행하세요.
            // 예: 검색 결과가 없음을 나타내는 문구를 숨기기 위해 상태를 업데이트하는 로직
        }
    };

    const locationRouter = useLocation();
    const query = locationRouter.state?.query || '';
    const defaultImage = '/images/roopy.png';

    function toggleFavorite(shop) {
        // 현재 즐겨찾기 상태 확인
        const isCurrentlyFavorite = isFavorite(shop);

        const url = isCurrentlyFavorite ?
            `http://172.30.1.96/api/favoritePick/${USER_ID}/remove/${shop.id}` :
            `http://172.30.1.96/api/favoritePick/${USER_ID}/add/${shop.id}`;

        axios.post(url) // post 방식 호출
            .then(response => {
                if (isCurrentlyFavorite) {
                    // 즐겨찾기에서 제거된 경우 로컬 상태 업데이트
                    const newFavorites = favorites.filter(item => item.id !== shop.id);
                    setFavorites(newFavorites);
                } else {
                    // 즐겨찾기에 추가된 경우 로컬 상태 업데이트
                    setFavorites([...favorites, shop]);
                }
            })
            .catch(error => {
                console.error("즐겨찾기 상태 변경 중 오류 발생:", error);
            });
    }

    function parseJwt(token) {
        try {
            // JWT 토큰의 Payload 부분을 디코딩합니다.
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
        } catch (error) {
            console.error("Error parsing JWT:", error);
            return null;
        }
    }

    const token = localStorage.getItem('jwtToken');
    const payload = parseJwt(token);
    const USER_ID = payload?.userId;



    function isFavorite(shop) {
        return favorites.some(item => item.id === shop.id); // shop의 id로 즐겨찾기 체크
    }

    return (
        <div className='App-main2'>
            <Header
                page="search"
                searchInput={searchInput}
                handleSearchChange={handleSearchChange}
                handleDeleteClick={handleDeleteClick}
                handleSearchClick={handleSearchClick}
                setAddressToHome={setAddressToHome}
                handleKeyUp={handleKeyUp}  // 이렇게 handleKeyUp를 추가합니다.


            />

            <div className='hashtag-container'>
                <div className="hashtag-buttons">
                    <button onClick={() => handleHashTagClick('#분식')}>#분식</button>
                    <button onClick={() => handleHashTagClick('#떡볶이')}>#떡볶이</button>
                    <button onClick={() => handleHashTagClick('#포장마차')}>#포장마차</button>
                    <button onClick={() => handleHashTagClick('#닭발')}>#닭발</button>
                    <button onClick={() => handleHashTagClick('#오뎅')}>#오뎅</button>
                    <button onClick={() => handleHashTagClick('#타코야끼')}>#타코야끼</button>
                </div>
            </div>

            {searchResults.length > 0 && (
                <>
                    {searchInput && <h2>{`'${searchInput}'에 대한 결과`}</h2>}
                    <div className="results-container">
                        {searchResults.map((shop, index) => (
                            shop.vendorName && shop.vendorType && shop.location ? (
                                <div className="result-item" key={index} onClick={() => window.location.href = `/shopHome/${shop.id}`}>
                                    <img src={shop.primaryimgurl ? shop.primaryimgurl : defaultImage} alt={`${shop.vendorName}의 이미지`} />
                                    <div className="result-info">
                                        <p className="shop-name">{shop.vendorName}</p>
                                        <div className="rating">
                                            <StarIcon style={{ color: yellow[700], fontSize: 20 }} />
                                            <span>{shop.totalReviewScore !== null && shop.totalReviewScore !== undefined ? shop.totalReviewScore : "등록된 점수가 없습니다"}</span>
                                        </div>
                                        <p>{shop.vendorType} / {shop.location}</p>
                                    </div>
                                    <div className="favorite-container">
                                        {isFavorite(shop) ? (
                                            <FavoriteIcon onClick={(e) => { e.stopPropagation(); toggleFavorite(shop); }} />
                                        ) : (
                                            <FavoriteBorderIcon onClick={(e) => { e.stopPropagation(); toggleFavorite(shop); }} />
                                        )}

                                    </div>
                                </div>
                            ) : null
                        ))}
                    </div>
                </>
            )}
            <Footer type="search" />
        </div>
    );
}

export default Search;