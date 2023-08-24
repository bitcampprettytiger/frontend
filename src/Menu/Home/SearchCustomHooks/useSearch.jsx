import { useState, useEffect } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

function useSearch(initialShops) {
    const [searchResults, setSearchResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const [data, setData] = useState([]); // 백엔드에서 가져온 데이터를 저장하기 위한 상태

    useEffect(() => {
        const API_URL = "http://172.30.1.96/vendor/category"; // 예시 API URL
        axios.get(API_URL)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("데이터를 불러오는 데 실패했습니다.", error);
            });
    }, []);

    // const handleSearchChange = debounce((e) => {
    //     setSearchInput(e.target.value);
    //     handleSearchClick();
    // }, 300); // 300ms 동안 아무런 입력이 없으면 검색을 수행합니다.
    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };


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
        axios.get(`http://172.30.1.96/vendor/category?address=${searchInput}&menuName=${searchInput}&vendorName=${searchInput}`)
            .then(response => {
                setSearchResults(response.data.itemlist); // setShops -> setSearchResults로 변경
            })
            .catch(error => {
                console.error("데이터를 불러오는 데 실패했습니다.", error);
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