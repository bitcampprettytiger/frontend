import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../../../Layout/Header.jsx';
import Footer from '../Layout/Footer';
import './Search.css';
import { Star as StarIcon } from '@mui/icons-material';
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';
import { yellow } from '@mui/material/colors';
import axios from 'axios';



function Search() {
    const location = useLocation();
    const query = location.state?.query || '';
    const [searchResults, setSearchResults] = useState([]);
    const [searchInput, setSearchInput] = useState(query);
    const defaultImage = '/images/roopy.png';
    const [hasSearched, setHasSearched] = useState(false);
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || {});

    const toggleFavorite = (index) => {
        const newFavorites = { ...favorites };
        newFavorites[index] = !newFavorites[index];
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };


    //임시데이터
    const predefinedData = [
        {
            name: '가게1',
            rating: 4.5, // 별점 정보 추가
            category: '분식', // 카테고리 정보 추가
            neighborhood: '동네1',
            menu: '붕어빵, 떡볶이',
            image: null, //지금은 이미지가 없응께
            content: '최고의 붕어빵을 판매합니다.'

        }
    ];


    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    }

    const handleDeleteClick = () => {
        setSearchInput();
        setSearchResults([]);
        setHasSearched(false); // 검색 상태를 초기화합니다.
    };
    const handleHashTagClick = (tag) => {
        setSearchInput(tag); // 검색어를 해시태그로 설정
        handleSearchClick(); // 검색 수행
    };


    const handleSearchClick = () => {
        // 해시태그(#)를 제거한 후 검색을 수행합니다.
        const cleanedSearchInput = searchInput.replace('#', '');
        const results = predefinedData.filter(item =>
            (item.name && item.name.includes(cleanedSearchInput)) ||
            (item.menu && item.menu.includes(cleanedSearchInput)) ||
            (item.content && item.content.includes(cleanedSearchInput))
        );
        setSearchResults(results);
        setHasSearched(true); // 여기서 hasSearched를 true로 설정합니다.
    };
    {
        searchResults && searchResults.map((result, index) => (
            <div className="result-item" key={index}>
                <img src={result.image && result.image.trim() !== '' ? result.image : defaultImage} alt={result.name} />
                <div className="result-info">
                    <h3>{result.name}</h3>
                    <div className="rating">
                        <img src="별점_이미지_URL" alt={`별점: ${result.rating}`} /> {/* 별점 이미지 URL을 넣으세요 */}
                        <p>{result.rating}</p>
                    </div>
                    <p>카테고리: {result.category} / 지역: {result.neighborhood}</p>
                </div>
            </div>
        ))
    }

    useEffect(() => {

    }, [query]); // 검색어가 변경될 때마다 효과를 다시 실행합니다.

    return (
        <div className='App-main2'>
            <Header
                page="search"
                searchInput={searchInput}
                handleSearchChange={handleSearchChange}
                handleDeleteClick={handleDeleteClick}
                handleSearchClick={handleSearchClick} />

            {/* 해시태그 버튼들 */}
            <div className="hashtag-buttons">
                <button onClick={() => handleHashTagClick('#분식')}>#분식</button>
                <button onClick={() => handleHashTagClick('#피자')}>#피자</button>
                {/* 다른 해시태그 버튼들도 추가 가능 */}
            </div>

            {searchResults.length > 0 ? (
                <>
                    <h2>{`'${searchInput}'에 대한 결과`}</h2>
                    <div className="results-container">
                        {searchResults.map((result, index) => (
                            <div className="result-item" key={index}>
                                <img src={result.image && result.image.trim() !== '' ? result.image : defaultImage} alt={`${result.name}의 이미지`} />
                                <div className="result-info">
                                    <h3>{result.name}</h3>
                                    <div className="rating">
                                        <StarIcon style={{ color: yellow[700], fontSize: 20 }} />
                                        <span>{result.rating !== null && result.rating !== undefined ? result.rating : "등록된 점수가 없습니다"}</span>
                                    </div>
                                    <p>{result.category || "분식"} / {result.neighborhood || "송파동"}</p>
                                </div>
                                <div className="result-favorite">
                                    {favorites[index] ? (
                                        <FavoriteIcon onClick={() => toggleFavorite(index)} />
                                    ) : (
                                        <FavoriteBorderIcon onClick={() => toggleFavorite(index)} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <h2>{`'${searchInput}'에 대한 검색 결과가 없습니다.`}</h2>
            )}
        </div>
    );
}
export default Search;
