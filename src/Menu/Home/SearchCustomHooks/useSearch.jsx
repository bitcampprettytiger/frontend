import { useState, useEffect } from 'react';
import axios from 'axios';

function useSearch(initialShops) {
    const [searchResults, setSearchResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const [data, setData] = useState([]); // 백엔드에서 가져온 데이터를 저장하기 위한 상태

    useEffect(() => {
        const API_URL = "http://27.96.135.75/info/vendorId"; // 예시 API URL
        axios.get(API_URL)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("데이터를 불러오는 데 실패했습니다.", error);
            });
    }, []);

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    }

    const handleDeleteClick = () => {
        setSearchInput('');
        setSearchResults([]);
        setHasSearched(false);
    };

    const handleHashTagClick = (tag) => {
        setSearchInput(tag);
        handleSearchClick(tag);
    };

    const handleSearchClick = () => {
        setHasSearched(true);
        // 새로운 API 엔드포인트로 변경하여 검색
        axios.get(`http://27.96.135.75/vendor/category?address=${searchInput}`)
            .then(response => {
                setSearchResults(response.data.itemlist);
            })
            .catch(error => {
                console.error("검색 도중 오류가 발생했습니다.", error);
                setSearchResults([]);  // 에러가 발생한 경우 결과를 비워줍니다.
            });
    };


    return {
        searchResults,
        searchInput,
        hasSearched,
        handleSearchChange,
        handleDeleteClick,
        handleHashTagClick,
        handleSearchClick
    };
};

export default useSearch;