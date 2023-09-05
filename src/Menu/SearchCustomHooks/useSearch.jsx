import { useState, useEffect } from 'react';
import axios from 'axios';
import getShopsData from '../HomeCustomHooks/getShopsData';

const useSearch = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const shopData = await getShopsData(); // 공통 함수 호출
            setData(shopData);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const API_URL = "https://mukjachi.site:7443/info/vendorId"; // 예시 API URL
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
        const cleanedSearchInput = searchInput.toLowerCase().replace('#', '');
        const results = data.filter(item => // `data`를 사용하여 검색
            (item.name && item.name.toLowerCase().includes(cleanedSearchInput)) ||
            (item.menu && item.menu.toLowerCase().includes(cleanedSearchInput)) ||
            (item.content && item.content.toLowerCase().includes(cleanedSearchInput)) ||
            (item.neighborhood && item.neighborhood.toLowerCase().includes(cleanedSearchInput))
        );
        setSearchResults(results);
        setHasSearched(true);
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
