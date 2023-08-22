import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from '../../../Layout/Header.jsx';
import Footer from '../../../Layout/Footer.jsx';
import './Search.css';
import { Star as StarIcon } from '@mui/icons-material';
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';
import { yellow } from '@mui/material/colors';
import axios from 'axios';
import useAddress from '../../SearchCustomHooks/useAddress.jsx';
import useSearch from '../../SearchCustomHooks/useSearch.jsx';

function Search() {
    const API_URL = "http://27.96.135.75/info/vendorId";
    const { address, location, setAddressToHome } = useAddress();
    const [shops, setShops] = useState([]);
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || {});

    useEffect(() => {
        axios.get(API_URL)
            .then(response => {
                setShops(response.data);
            })
            .catch(error => {
                console.error("데이터를 불러오는 데 실패했습니다.", error);
            });
    }, []);

    const {
        searchResults,
        searchInput,
        hasSearched,
        handleSearchChange,
        handleDeleteClick,
        handleHashTagClick,
        handleSearchClick
    } = useSearch(shops); // shops를 직접 전달

    const locationRouter = useLocation();
    const query = locationRouter.state?.query || '';
    const defaultImage = '/images/roopy.png';

    const toggleFavorite = (index) => {
        const newFavorites = { ...favorites };
        newFavorites[index] = !newFavorites[index];
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    useEffect(() => {
        // 필요한 로직이 있다면 이곳에 추가
    }, [query]);

    return (
        <div className='App-main2'>
            <Header
                page="search"
                searchInput={searchInput}
                handleSearchChange={handleSearchChange}
                handleDeleteClick={handleDeleteClick}
                handleSearchClick={handleSearchClick}
                setAddressToHome={setAddressToHome}
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

            {searchResults.length > 0 ? (
                <>
                    {searchInput && <h2>{`'${searchInput}'에 대한 결과`}</h2>}
                    <div className="results-container">
                        {searchResults.map((shop, index) => ( // searchResults를 직접 사용
                            <Link to={`/shop/${shop.name}`} key={index}>
                                <div className="result-item">
                                    <img src={shop.imageURL ? shop.imageURL : defaultImage} alt={`${shop.name}의 이미지`} />
                                    <div className="result-info">
                                        <h3>{shop.name}</h3>
                                        <div className="rating">
                                            <StarIcon style={{ color: yellow[700], fontSize: 20 }} />
                                            <span>{shop.rating !== null && shop.rating !== undefined ? shop.rating : "등록된 점수가 없습니다"}</span>
                                        </div>
                                        <p>{shop.category || "분식"} / {shop.neighborhood || "송파동"}</p>
                                    </div>
                                    <div className="result-favorite">
                                        {favorites[index] ? (
                                            <FavoriteIcon onClick={(e) => { e.stopPropagation(); toggleFavorite(index); }} />
                                        ) : (
                                            <FavoriteBorderIcon onClick={(e) => { e.stopPropagation(); toggleFavorite(index); }} />
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            ) : (
                hasSearched && <h2>{`'${searchInput}'에 대한 검색 결과가 없습니다.`}</h2>
            )}

            <Footer type="search" />
        </div>
    );
}

export default Search;
