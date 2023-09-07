import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../../Layout/Header';
import Footer from '../../../Layout/Footer';
import './Search.css';
import { useSearch } from '../SearchCustomHooks/useSearch';
import { useGeolocation } from '../../GeolocationCustomHooks/useGeolocation';
import StarIcon from '@mui/icons-material/Star';
import getShopsData from '../../HomeCustomHooks/getShopsData';
import { ToggleButton, ToggleButtonGroup, Box } from '@mui/material';

const Search = () => {
    const location = useLocation(); //추가
    const [searchQuery, setSearchQuery] = useState(''); //추가
    const navigate = useNavigate();
    const headerText = location.state?.headerText || 'Default Header'; //추가
    const [shops, setShops] = useState([]); // 상점 정보를 저장하는 상태
    const [sortRating, setSortRating] = useState('high');
    const [sortReview, setSortReview] = useState('many');
    const [query, setQuery] = useState(location.state ? location.state.query : '');
    const autoSearch = location.state ? location.state.autoSearch : false;

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
        navigate(`/shophome/${vendorId}`);
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

    const ToggleBox = ({ options, selected, onToggle }) => {
        return (
            <Box mr={2}>
                <ToggleButtonGroup
                    value={selected}
                    exclusive
                    onChange={(_, newValue) => onToggle(newValue)}
                    aria-label="sort options"
                >
                    {options.map(option => (
                        <ToggleButton key={option.value} value={option.value}>
                            {option.label}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Box>
        );
    };


    useEffect(() => {
        async function fetchData() {
            const data = await getShopsData(); // 공통 함수를 통해 상점 정보를 가져옴
            if (data && data.result && data.result.itemlist) {
                setShops(data.result.itemlist);  // 가져온 상점 정보를 상태에 저장
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            setSearchInput(searchQuery);
            handleSearchClick();
        }
    }, [searchQuery]);

    useEffect(() => {
        let sortedResults = [...searchResults];

        // 별점 정렬
        if (sortRating === 'high') {
            sortedResults.sort((a, b) => b.averageReviewScore - a.averageReviewScore);
        } else if (sortRating === 'low') {
            sortedResults.sort((a, b) => a.averageReviewScore - b.averageReviewScore);
        }

        // 리뷰 수 정렬
        if (sortReview === 'many') {
            sortedResults.sort((a, b) => b.reviewCount - a.reviewCount);
        } else if (sortReview === 'few') {
            sortedResults.sort((a, b) => a.reviewCount - b.reviewCount);
        }

        setSearchResults(sortedResults);
    }, [sortRating, sortReview]);


    useEffect(() => {
        // URL의 쿼리 파라미터로부터 검색어를 가져옴
        const params = new URLSearchParams(location.search);
        const query = params.get('query');


        if (query) {
            setSearchQuery(query);
            // 여기서 query를 사용하여 자동으로 검색을 수행하면 됩니다.
        }
    }, [location]);

    useEffect(() => {
        if (location.state) {
            const { query, autoSearch } = location.state;

            // 검색창 값 채우기
            if (query) {
                setSearchInput(query); // 여기서 검색창의 값을 업데이트합니다.
            }

            // autoSearch 값이 true일 경우 자동으로 검색 수행
            if (autoSearch) {
                handleSearchClick(); // 여기서 자동 검색을 수행합니다.
            }
        }
    }, [location, handleSearchClick]);


    return (
        <div>
            <div className="App-main2">
                <Header
                    page="search"
                    searchInput={searchInput}
                    handleSearchChange={handleSearchChange}
                    handleSearchClick={handleSearchClick}
                    handleDeleteClick={handleDeleteClick}
                    handleKeyUp={handleKeyUp}
                />

                {/* ToggleBox는 항상 상단에 위치합니다. */}
                <Box display="flex" justifyContent="flex-end" mb={2}>
                    <ToggleBox
                        options={[
                            { label: '별점높은순', value: 'high' },
                            { label: '별점낮은순', value: 'low' }
                        ]}
                        selected={sortRating}
                        onToggle={(option) => setSortRating(option)}
                    />
                    <ToggleBox
                        options={[
                            { label: '리뷰많은순', value: 'many' },
                            { label: '리뷰적은순', value: 'few' }
                        ]}
                        selected={sortReview}
                        onToggle={(option) => setSortReview(option)}
                    />
                </Box>

                {/* 최근 검색어와 최근 확인한 가게는 검색어가 없거나 검색 결과가 없을 때만 보입니다. */}
                {(!searchInput || searchResults.length === 0) && (
                    <div style={{ padding: '5%' }}>
                        <div >
                            <h3>최근 검색어</h3>
                            <div className="hashtag-buttons">
                                {recentSearches.map((item, index) => (
                                    <button
                                        key={index}
                                        className="hashtag-button"
                                        onClick={() => handleRecenthandleSearchClick(item.text)}
                                    >
                                        #{item.text}
                                    </button>
                                ))}
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
                    </div>
                )}

                {/* 검색 결과에 따라 가게 목록을 표시합니다. */}
                <div className="results-container">
                    {searchResults.map(vendor => (
                        <div key={vendor.id} className="result-item" onClick={() => handleShopClick(vendor.id)}>
                            <img src={vendor.imgSrc ? vendor.imgSrc : "/images/roopy.png"} alt={vendor.vendorName} />
                            <div className="result-info">
                                <p className="shop-name">{vendor.vendorName}</p>
                                <div className="rating">
                                    <StarIcon style={{ color: 'goldenrod' }} />
                                    {vendor.averageReviewScore}
                                    <span className="review-count">작성된 리뷰{vendor.reviewCount}개</span>
                                </div>
                                <p>{vendor.vendorType} / {vendor.address}</p>
                            </div>
                            <div className="favorite-container">
                                {/* 즐겨찾기 아이콘을 추가할 위치 */}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 상점 정보를 화면에 출력합니다. */}
                {shops.map(shop => (
                    <div key={shop.id}>
                        <h2>{shop.vendorName}</h2>
                        <p>{shop.address}</p>
                        <p>영업 시간: {shop.open} - {shop.close} ({shop.businessDay})</p>
                    </div>
                ))}

            </div>
            <Footer type="search" />
        </div>
    );


}






export default Search;
